import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-elevated text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-danger/10 rounded-2xl flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-danger" />
          </div>
          <div>
            <CardTitle className="text-4xl font-bold text-foreground">404</CardTitle>
            <CardDescription className="text-lg mt-2">
              Oops! Página não encontrada
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Button 
            asChild 
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            <a href="/">
              <Home className="w-4 h-4 mr-2" />
              Voltar ao Início
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
