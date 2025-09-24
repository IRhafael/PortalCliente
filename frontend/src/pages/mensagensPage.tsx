import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
	id: number;
	sender: string;
	text: string;
	created_at?: string;
}

export default function MensagensPage() {
	const { user } = useAuth();
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(true);
	const [sending, setSending] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Buscar mensagens do backend ao carregar
	useEffect(() => {
		async function fetchMessages() {
			setLoading(true);
			try {
				const res = await fetch("/api/messages/");
				if (res.ok) {
					const data = await res.json();
					setMessages(data);
				} else {
					setMessages([]);
				}
			} catch {
				setMessages([]);
			}
			setLoading(false);
		}
		fetchMessages();
	}, []);

	// Scroll automático para a última mensagem
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// Enviar nova mensagem para o backend
	const handleSend = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || sending) return;
		setSending(true);
		try {
			const res = await fetch("/api/messages/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text: input }),
			});
			if (res.ok) {
				const msg = await res.json();
				setMessages(prev => [...prev, msg]);
				setInput("");
			}
		} finally {
			setSending(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto py-8 px-4 flex flex-col h-[70vh]">
			<h1 className="text-2xl font-bold mb-6">Mensagens com o Responsável</h1>
			<div className="flex-1 overflow-y-auto bg-card rounded-lg p-4 mb-4 shadow">
				{loading ? (
					<div className="text-center text-muted-foreground">Carregando mensagens...</div>
				) : messages.length === 0 ? (
					<div className="text-center text-muted-foreground">Nenhuma mensagem ainda.</div>
				) : (
					messages.map(msg => (
						<div
							key={msg.id}
							className={`mb-3 flex ${msg.sender === "cliente" ? "justify-end" : "justify-start"}`}
						>
							<div
								className={`px-4 py-2 rounded-lg max-w-[70%] text-sm shadow
									${msg.sender === "cliente"
										? "bg-primary text-white"
										: "bg-accent text-foreground"}
								`}
							>
								{msg.text}
							</div>
						</div>
					))
				)}
				<div ref={messagesEndRef} />
			</div>
			<form onSubmit={handleSend} className="flex gap-2">
				<input
					className="flex-1 border rounded px-3 py-2"
					placeholder="Digite sua mensagem..."
					value={input}
					onChange={e => setInput(e.target.value)}
					disabled={sending}
				/>
				<button type="submit" className="bg-primary text-white px-4 py-2 rounded" disabled={sending}>
					{sending ? "Enviando..." : "Enviar"}
				</button>
			</form>
		</div>
	);
}
