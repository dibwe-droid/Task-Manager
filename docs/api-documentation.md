# API Documentation Setup

This project uses OpenAPI 3.0 specification for API documentation, which can be viewed with Swagger UI.

## Files

- `docs/openapi.yaml` - OpenAPI 3.0 specification file
- `docs/api.md` - Markdown documentation (human-readable reference)

## Setting Up Swagger UI

### Option 1: Swagger UI Express (Recommended for Development)

Install Swagger UI Express in the backend:

```bash
cd src/backend
npm install swagger-ui-express
npm install --save-dev @types/swagger-ui-express
```

Add Swagger UI route to your Express app (`src/backend/app.ts`):

```typescript
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import fs from 'fs';
import path from 'path';

// Read OpenAPI spec
const openApiPath = path.join(__dirname, '../../docs/openapi.yaml');
const file = fs.readFileSync(openApiPath, 'utf8');
const swaggerDocument = YAML.parse(file);

// Add Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
```

Install YAML parser:

```bash
npm install yaml
npm install --save-dev @types/yaml
```

Now you can access the API documentation at:
- `http://localhost:3000/api-docs`

### Option 2: Standalone Swagger UI (For Deployment)

You can host the OpenAPI spec and use Swagger UI online:

1. Host `docs/openapi.yaml` on your server or GitHub
2. Use Swagger UI online: https://editor.swagger.io/
3. Or use Redoc: https://redocly.github.io/redoc/

### Option 3: Redoc (Alternative UI)

Redoc provides a beautiful, responsive API documentation UI:

```bash
npm install redoc-express
```

```typescript
import redoc from 'redoc-express';
import YAML from 'yaml';
import fs from 'fs';
import path from 'path';

const openApiPath = path.join(__dirname, '../../docs/openapi.yaml');
const file = fs.readFileSync(openApiPath, 'utf8');
const swaggerDocument = YAML.parse(file);

app.get('/api-docs', redoc({
  title: 'Task Manager API',
  specUrl: '/api-docs/openapi.yaml',
  nonce: '', // optional
  redocOptions: {
    theme: {
      colors: {
        primary: {
          main: '#6b5ce6'
        }
      }
    }
  }
}));
```

## Updating the OpenAPI Spec

When you add new endpoints or modify existing ones:

1. Update `docs/openapi.yaml` with the new endpoint definitions
2. Update `docs/api.md` for human-readable reference
3. Test the Swagger UI to ensure it displays correctly

## Best Practices

1. **Keep it in sync**: Update the OpenAPI spec whenever you change the API
2. **Add examples**: Include request/response examples for better documentation
3. **Describe parameters**: Add descriptions for all query parameters and request bodies
4. **Error responses**: Document all possible error responses
5. **Version control**: The OpenAPI spec is version controlled, so changes are tracked

## Integration with Sprint Plan

- **Sprint 2**: Create initial OpenAPI spec for Task CRUD endpoints
- **Sprint 3**: Add filtering, sorting, and Projects endpoints to spec
- **Sprint 4**: Add subtask endpoints to spec
- **Sprint 8**: Set up Swagger UI for deployment

## Deployment

For production deployment:

1. Ensure the OpenAPI spec is accessible (hosted or in the repo)
2. Set up Swagger UI route in production
3. Update the `servers` section in `openapi.yaml` with production URL
4. Consider adding authentication if the API requires it

## Tools

- **Swagger Editor**: https://editor.swagger.io/ - Edit and validate OpenAPI specs
- **Swagger UI**: https://swagger.io/tools/swagger-ui/ - Interactive API documentation
- **Redoc**: https://redocly.com/redoc - Alternative documentation UI
- **Postman**: Can import OpenAPI specs to create collections







