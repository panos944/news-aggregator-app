import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';
import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'News Aggregator API',
    version: '1.0.0',
    description:`# News Aggregator API
    
    A comprehensive MERN stack application that aggregates news from multiple Greek sources.
    
    ## Features
    - JWT-based authentication
    - Multi-source news aggregation
    - Layered architecture (Controllers, Services, Repositories)
    - Comprehensive unit testing
    - Interactive API documentation
    
    ## Sources
    - Real.gr
    - InStyle.gr  
    - Real Kiosk
    - The Cars
    - Real Player
    
    ## Authentication
    Most endpoints require authentication. Use the /api/auth/login endpoint to get a JWT token, 
    then include it in the Authorization header as: Bearer {token}`,
    contact: {
      name: 'API Support',
      email: 'panos.hatzinikolaou@gmail.com'
    },
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'User ID',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address',
          },
          firstName: {
            type: 'string',
            description: 'User first name',
          },
          lastName: {
            type: 'string',
            description: 'User last name',
          },
          role: {
            type: 'string',
            enum: ['user', 'admin'],
            description: 'User role',
          },
        },
      },
      Article: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'Article ID',
          },
          title: {
            type: 'string',
            description: 'Article title',
          },
          url: {
            type: 'string',
            format: 'uri',
            description: 'Article URL',
          },
          source: {
            type: 'string',
            description: 'Article source',
          },
          publishedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Publication date',
          },
          description: {
            type: 'string',
            description: 'Article description',
          },
          imageUrl: {
            type: 'string',
            format: 'uri',
            description: 'Article image URL',
          },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: 'Operation success status',
          },
          message: {
            type: 'string',
            description: 'Response message',
          },
          user: {
            $ref: '#/components/schemas/User',
          },
          token: {
            type: 'string',
            description: 'JWT authentication token',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          message: {
            type: 'string',
            description: 'Error message',
          },
          errors: {
            type: 'array',
            items: {
              type: 'object',
            },
            description: 'Validation errors',
          },
        },
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: ['./src/api/*.ts'], // Path to the API files
};


export const setupSwagger = (app: Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export const swaggerSpec = swaggerJSDoc(options);