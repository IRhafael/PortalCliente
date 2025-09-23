// Simula endpoints REST com delay artificial
export const mockApi = {
  async login({ email, password }: { email: string, password: string }) {
    await new Promise(r => setTimeout(r, 700));
    if (email === "cliente@conta.com" && password === "123456") {
      return {
        token: "mock-jwt-token",
        refreshToken: "mock-refresh-token",
        user: { id: 1, name: "Cliente Exemplo", email }
      };
    }
    throw new Error("Credenciais inválidas");
  },
  async refresh({ refreshToken }: { refreshToken: string }) {
    await new Promise(r => setTimeout(r, 500));
    if (refreshToken === "mock-refresh-token") {
      return { token: "mock-jwt-token-novo" };
    }
    throw new Error("Refresh inválido");
  },
  async getSummary(companyId: number) {
    await new Promise(r => setTimeout(r, 600));
    return {
      pendentes: 3,
      emAnalise: 2,
      concluidas: 10,
      graficoStatus: [3, 2, 10],
      graficoMes: [2, 1, 3, 2, 4, 3, 0, 1, 2, 1, 0, 0],
      proximosVencimentos: [
        { descricao: "DAS", vencimento: "2024-07-10", status: "Pendente" },
        { descricao: "FGTS", vencimento: "2024-07-15", status: "Em Análise" }
      ]
    };
  },
  // ...outros endpoints simulados conforme requisitos...
};
