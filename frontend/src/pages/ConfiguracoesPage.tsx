import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function ConfiguracoesPage() {
	const { user } = useAuth();
	const [editMode, setEditMode] = useState(false);
	const [name, setName] = useState(user?.name || "");
	const [email, setEmail] = useState(user?.email || "");

	// Placeholder para salvar alterações
	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		// Aqui você pode implementar a chamada para atualizar o usuário no backend
		setEditMode(false);
	};

		// Estados para alteração de senha
		const [showPasswordForm, setShowPasswordForm] = useState(false);
		const [currentPassword, setCurrentPassword] = useState("");
		const [newPassword, setNewPassword] = useState("");
		const [confirmPassword, setConfirmPassword] = useState("");
		const [passwordError, setPasswordError] = useState("");
		const [passwordSuccess, setPasswordSuccess] = useState("");

		const handlePasswordChange = (e: React.FormEvent) => {
			e.preventDefault();
			setPasswordError("");
			setPasswordSuccess("");
			if (newPassword.length < 6) {
				setPasswordError("A nova senha deve ter pelo menos 6 caracteres.");
				return;
			}
			if (newPassword !== confirmPassword) {
				setPasswordError("As senhas não coincidem.");
				return;
			}
			// Aqui você pode implementar a chamada para alterar a senha no backend
			setPasswordSuccess("Senha alterada com sucesso!");
			setShowPasswordForm(false);
			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");
		};

		return (
			<div className="max-w-2xl mx-auto py-8 px-4">
				<h1 className="text-2xl font-bold mb-6">Configurações da Conta</h1>

				{/* Seção de dados do usuário */}
				<div className="bg-card p-6 rounded-lg shadow mb-8">
					<h2 className="text-lg font-semibold mb-4">Dados do Usuário</h2>
					{editMode ? (
						<form onSubmit={handleSave} className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-1">Nome</label>
								<input
									className="w-full border rounded px-3 py-2"
									value={name}
									onChange={e => setName(e.target.value)}
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">E-mail</label>
								<input
									className="w-full border rounded px-3 py-2"
									type="email"
									value={email}
									onChange={e => setEmail(e.target.value)}
									required
									disabled
								/>
							</div>
							<button type="submit" className="bg-primary text-white px-4 py-2 rounded">Salvar</button>
							<button type="button" className="ml-2 text-sm underline" onClick={() => setEditMode(false)}>Cancelar</button>
						</form>
					) : (
						<div>
							<div className="mb-2"><span className="font-medium">Nome:</span> {user?.name}</div>
							<div className="mb-2"><span className="font-medium">E-mail:</span> {user?.email}</div>
							<button className="mt-2 bg-primary text-white px-4 py-2 rounded" onClick={() => setEditMode(true)}>Editar Dados</button>
							<button className="ml-4 text-sm underline" onClick={() => setShowPasswordForm(v => !v)}>
								{showPasswordForm ? "Cancelar alteração de senha" : "Alterar Senha"}
							</button>
						</div>
					)}

					{/* Formulário de alteração de senha */}
					{showPasswordForm && (
						<form onSubmit={handlePasswordChange} className="mt-6 space-y-4 border-t pt-6">
							<div>
								<label className="block text-sm font-medium mb-1">Senha atual</label>
								<input
									className="w-full border rounded px-3 py-2"
									type="password"
									value={currentPassword}
									onChange={e => setCurrentPassword(e.target.value)}
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">Nova senha</label>
								<input
									className="w-full border rounded px-3 py-2"
									type="password"
									value={newPassword}
									onChange={e => setNewPassword(e.target.value)}
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">Confirmar nova senha</label>
								<input
									className="w-full border rounded px-3 py-2"
									type="password"
									value={confirmPassword}
									onChange={e => setConfirmPassword(e.target.value)}
									required
								/>
							</div>
							{passwordError && <div className="text-red-600 text-sm">{passwordError}</div>}
							{passwordSuccess && <div className="text-green-600 text-sm">{passwordSuccess}</div>}
							<button type="submit" className="bg-primary text-white px-4 py-2 rounded">Salvar Nova Senha</button>
						</form>
					)}
				</div>

				{/* Seção de integrações */}
				<div className="bg-card p-6 rounded-lg shadow">
					<h2 className="text-lg font-semibold mb-4">Integrações e Conexões</h2>
					<p className="text-sm text-muted-foreground mb-4">
						Conecte sua conta a outros serviços para facilitar a gestão de clientes e documentos.
					</p>
					{/* Exemplos de integrações futuras */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<span>Integração com sistema de clientes</span>
							<button className="bg-accent px-3 py-1 rounded text-sm">Conectar</button>
						</div>
						<div className="flex items-center justify-between">
							<span>Integração com e-mail fiscal</span>
							<button className="bg-accent px-3 py-1 rounded text-sm">Conectar</button>
						</div>
						{/* Adicione mais integrações conforme necessário */}
					</div>
				</div>
			</div>
		);
}
