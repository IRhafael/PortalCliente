import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToastContext } from '@/contexts/ToastContext';
import { Spinner } from '@/components/Spinner';


export default function RegisterPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { addToast } = useToastContext();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await fetch('/api/register/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			});
			let data = null;
			try {
				data = await response.json();
			} catch (e) {
				// resposta vazia ou não JSON
			}
			if (!response.ok) {
				throw new Error(
					data?.email?.[0] || data?.password?.[0] || data?.name?.[0] || data?.non_field_errors?.[0] || data?.detail || 'Erro ao registrar usuário.'
				);
			}
			addToast('Cadastro realizado com sucesso! Faça login.', 'success');
			navigate('/login');
		} catch (error) {
			addToast(error instanceof Error ? error.message : 'Erro ao registrar', 'danger');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/20 to-primary/5 px-4">
			<div className="w-full max-w-md animate-fade-in">
				<Card className="shadow-elevated border-card-border">
					<CardHeader className="space-y-4 text-center">
						<div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-card">
							<User className="w-8 h-8 text-primary-foreground" />
						</div>
						<div>
							<CardTitle className="text-2xl font-bold text-foreground">
								Criar Conta
							</CardTitle>
							<CardDescription className="text-muted-foreground mt-2">
								Preencha os dados para se cadastrar
							</CardDescription>
						</div>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="name" className="text-sm font-medium">Nome completo</Label>
									<Input
										id="name"
										value={name}
										onChange={e => setName(e.target.value)}
										placeholder="Seu nome completo"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<Input
											id="email"
											type="email"
											value={email}
											onChange={e => setEmail(e.target.value)}
											placeholder="seu@email.com"
											className="pl-9 h-11"
											required
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="password" className="text-sm font-medium">Senha</Label>
									<div className="relative">
										<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<Input
											id="password"
											type="password"
											value={password}
											onChange={e => setPassword(e.target.value)}
											placeholder="Crie uma senha"
											className="pl-9 h-11"
											required
										/>
									</div>
								</div>
							</div>
							<Button
								type="submit"
								className="w-full h-11 bg-primary hover:bg-primary-hover text-primary-foreground font-medium"
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										<Spinner size="sm" className="mr-2" />
										Registrando...
									</>
								) : (
									'Criar Conta'
								)}
							</Button>
						</form>
						<div className="mt-6 pt-6 border-t border-card-border text-center">
							<p className="text-sm text-muted-foreground">
								Já possui uma conta?{' '}
								<Link to="/login" className="text-primary underline hover:text-primary-hover">Entrar</Link>
							</p>
						</div>
					</CardContent>
				</Card>
				<div className="mt-6 text-center">
					<p className="text-xs text-muted-foreground">
						© 2024 Portal de Clientes. Sistema de gestão contábil.
					</p>
				</div>
			</div>
		</div>
	);
}