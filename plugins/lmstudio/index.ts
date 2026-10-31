import { Plugin } from '@opencode/plugin';

type Operation = 'models' | 'responses' | 'chat/completions' | 'completions' | 'embeddings';

interface LMStudioInput {
  operation: Operation;
  body?: Record<string, unknown>;
}

export default Plugin.define({
  id: 'lmstudio',
  async setup(ctx) {
    const baseURL = String(ctx.options.baseURL ?? 'http://127.0.0.1:1234/v1').replace(/\/$/, '');

    await ctx.tool.transform((editor) => {
      editor.add({
        name: 'lmstudio',
        description: 'Call the local LM Studio OpenAI-compatible API. Use models to list model IDs. For POST operations, supply body with the model and OpenAI request fields: input for responses or embeddings, messages for chat/completions, or prompt for completions. Returns the complete non-streaming API response.',
        input: {
          type: 'object',
          properties: {
            operation: {
              type: 'string',
              enum: ['models', 'responses', 'chat/completions', 'completions', 'embeddings'],
              description: 'API endpoint; models uses GET, all others use POST.'
            },
            body: {
              type: 'object',
              additionalProperties: true,
              description: 'OpenAI-compatible JSON request body. Not needed for models.'
            }
          },
          required: ['operation'],
          additionalProperties: false
        },
        async execute(input, context) {
          const { operation, body } = input as LMStudioInput;
          const isGet = operation === 'models';
          const payload = operation === 'embeddings' ? body : { ...body, stream: false };
          const response = await fetch(`${baseURL}/${operation}`, {
            method: isGet ? 'GET' : 'POST',
            headers: isGet ? undefined : { 'Content-Type': 'application/json' },
            body: isGet ? undefined : JSON.stringify(payload),
            signal: context.signal
          });
          const content = await response.text();
          if (!response.ok) {
            throw new Error(`LM Studio returned ${response.status}: ${content}`);
          }
          return { content };
        }
      });
    });
  }
});
