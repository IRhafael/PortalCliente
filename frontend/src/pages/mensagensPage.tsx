import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
	id: number;
	sender: string;
	text: string;
	created_at?: string;
}

// Mock do responsável (substitua por dados reais do backend depois)
const responsavel = {
  nome: "Maria Oliveira",
  email: "maria@empresa.com"
};

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
		<div className="max-w-2xl mx-auto py-8 px-2 sm:px-4 flex flex-col h-[80vh]">
			{/* Topo com responsável */}
			<div className="mb-4 bg-gradient-header rounded-lg px-4 py-4 shadow flex flex-col items-center justify-center">
				<div className="font-bold text-xl text-foreground mb-1 tracking-wide">{responsavel.nome}</div>
				<div className="text-xs text-muted-foreground">Responsável pelo atendimento</div>
			</div>

	{/* Área de mensagens */}
	<div className="flex-1 overflow-y-auto bg-card rounded-lg p-4 mb-4 shadow flex flex-col gap-2">
				{loading ? (
					<div className="text-center text-muted-foreground">Carregando mensagens...</div>
				) : messages.length === 0 ? (
					<div className="text-center text-muted-foreground">Nenhuma mensagem ainda.</div>
				) : (
					messages.map(msg => (
						<div
							key={msg.id}
							className={`flex ${msg.sender === "cliente" ? "justify-end" : "justify-start"}`}
						>
							<div
								className={`relative px-4 py-2 rounded-2xl max-w-[75%] text-sm shadow flex flex-col
									${msg.sender === "cliente"
										? "bg-primary text-white rounded-br-sm"
										: "bg-accent text-foreground rounded-bl-sm"}
								`}
							>
								<span>{msg.text}</span>
								{msg.created_at && (
									<span className="text-[10px] text-muted-foreground mt-1 self-end">
										{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
									</span>
								)}
							</div>
						</div>
					))
				)}
				<div ref={messagesEndRef} />
			</div>

			{/* Input de mensagem */}
			<form onSubmit={handleSend} className="flex gap-2 mt-auto">
				<input
					className="flex-1 border rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
					placeholder="Digite sua mensagem..."
					value={input}
					onChange={e => setInput(e.target.value)}
					disabled={sending}
				/>
				<button
					type="submit"
					className="bg-primary text-white px-6 py-2 rounded-full shadow hover:bg-primary-hover transition font-semibold"
					disabled={sending}
				>
					{sending ? "Enviando..." : "Enviar"}
				</button>
			</form>
		</div>
	);
}
