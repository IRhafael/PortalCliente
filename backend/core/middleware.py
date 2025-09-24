from django.utils.deprecation import MiddlewareMixin

class RequestLoggingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        print(f"[MIDDLEWARE] {request.method} {request.path} - DATA: {getattr(request, 'body', b'').decode(errors='ignore')}")
        return None
