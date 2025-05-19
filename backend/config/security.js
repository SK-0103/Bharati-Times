module.exports = {
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      'connect-src': ["'self'", 'http:', 'https:'],
      'img-src': ["'self'", 'data:', 'blob:', 'http:', 'https:'],
      'media-src': ["'self'", 'data:', 'blob:', 'http:', 'https:'],
      'default-src': ["'self'", 'http:', 'https:'],
    },
  },
  xframeOptions: {
    enabled: true,
    value: 'SAMEORIGIN',
  },
  hsts: {
    enabled: true,
    maxAge: 31536000,
    includeSubDomains: true,
  },
  xssFilter: {
    enabled: true,
  },
  cors: {
    enabled: true,
    origin: ['*'],
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    keepHeaderOnError: true,
  },
}; 