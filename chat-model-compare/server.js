// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer');
const upload = multer();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/chat', async (req, res) => {
    try {
        const { message, model, temperature, maxTokens } = req.body;
        const max_completion_tokens = maxTokens;  // max_completion_tokens를 maxTokens와 동일하게 설정 --> o1 시리즈 OpenAI API 요청 시 사용

        // o1 시리즈 OpenAI API 요청
        if (model.startsWith('o1')) {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: model,
                messages: [{
                    role: 'user',
                    content: message
                }],
                max_completion_tokens: parseInt(max_completion_tokens)
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                }
            });

            return res.json({
                content: [{
                    text: response.data.choices[0]?.message?.content || '응답을 생성할 수 없습니다.'
                }]
            });
        }

        // OpenAI API 요청
        if (model.startsWith('gpt') || model.startsWith('chatgpt')) {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: model,
                messages: [{
                    role: 'user',
                    content: message
                }],
                temperature: parseFloat(temperature),
                max_tokens: parseInt(maxTokens)
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                }
            });

            return res.json({
                content: [{
                    text: response.data.choices[0]?.message?.content || '응답을 생성할 수 없습니다.'
                }]
            });
        }
        
        // Gemini API 요청인 경우
        if (model.startsWith('gemini')) {
            const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
            
            const requestBody = {
                contents: {
                    role: "user",
                    parts: {
                        text: message
                    }
                },
                safety_settings: {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_LOW_AND_ABOVE"
                },
                generation_config: {
                    temperature: parseFloat(temperature),
                    topP: 1.0,
                    maxOutputTokens: parseInt(maxTokens)
                }
            };

            const response = await axios.post(API_URL, requestBody, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return res.json({
                content: [{
                    text: response.data.candidates[0]?.content?.parts[0]?.text || '응답을 생성할 수 없습니다.'
                }]
            });
        }
        
        // Mistral API 요청인 경우
        if (model.startsWith('mistral')) {
            const mistralMaxTokens = Math.min(parseInt(maxTokens), 2048); // mistral의 최대 토큰 수는 2048로 제한
            const response = await axios.post('https://api.mistral.ai/v1/chat/completions', {
                model: model,
                messages: [{
                    role: 'user',
                    content: message
                }],
                temperature: parseFloat(temperature),
                max_tokens: parseInt(mistralMaxTokens)
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`
                }
            });

            return res.json({
                content: [{
                    text: response.data.choices[0]?.message?.content || '응답을 생성할 수 없습니다.'
                }]
            });
        }
         // Grok API 요청인 경우
        if (model.startsWith('grok')) {
            const response = await axios.post('https://api.x.ai/v1/chat/completions', {
                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ],
                model: model,
                temperature: parseFloat(temperature),
                max_tokens: parseInt(maxTokens)
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.GROK_API_KEY}`
                }
            });
        
            return res.json({
                content: [{
                    text: response.data.choices[0]?.message?.content || '응답을 생성할 수 없습니다.'
                }]
            });
        }
        // Perplexity API 요청인 경우
        if (model.includes('sonar')) { 
            const response = await axios.post('https://api.perplexity.ai/chat/completions', {
                model: model,
                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ],
                temperature: parseFloat(temperature),
                max_tokens: parseInt(maxTokens)
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`
                }
            });

            return res.json({
                content: [{
                    text: response.data.choices[0]?.message?.content || '응답을 생성할 수 없습니다.'
                }]
            });
        }
        
        // LLaMA API 요청인 경우
        if (model.startsWith('llama3') || model.startsWith('llama-3')) {
            const response = await axios.post('https://api.llama-api.com/chat/completions', {
                model: model,
                messages: [{
                    role: 'user',
                    content: message
                }],
                temperature: parseFloat(temperature),
                max_tokens: parseInt(maxTokens)
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.LLAMA_API_KEY}`
                }
            });

            return res.json({
                content: [{
                    text: response.data.choices[0]?.message?.content || '응답을 생성할 수 없습니다.'
                }]
            });
        }

        if (model.startsWith('hcx')) {
            // 모델에 따른 엔드포인트 URL 설정
            const modelEndpoint = model === 'hcx-003' ? 'HCX-003' :
                                model === 'hcx-dash-001' ? 'HCX-DASH-001' : 'HCX-003';
                                
            // HyperClovaX의 최대 토큰 수는 2048로 제한
            const hyperxMaxTokens = Math.min(parseInt(maxTokens), 2048);
            
            const response = await axios.post(`https://clovastudio.apigw.ntruss.com/testapp/v1/chat-completions/${modelEndpoint}`, {
                messages: [{
                    role: 'user',
                    content: message
                }],
                temperature: parseFloat(temperature),
                maxTokens: hyperxMaxTokens
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-NCP-CLOVASTUDIO-REQUEST-ID': process.env.HYPERX_REQUEST_ID,
                    'X-NCP-CLOVASTUDIO-API-KEY': process.env.HYPERX_API_KEY,
                    'X-NCP-APIGW-API-KEY': process.env.HYPERX_APIGW_KEY
                }
            });
        
            return res.json({
                content: [{
                    text: response.data.result.message.content || '응답을 생성할 수 없습니다.'
                }]
            });
        }
        // Claude API 요청인 경우
        const response = await axios.post('https://api.anthropic.com/v1/messages', {
            model: model,
            max_tokens: maxTokens,
            temperature: temperature,
            messages: [{
                role: 'user',
                content: message
            }]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        res.status(500).json({
            error: 'An error occurred while processing your request'
        });
    }
});




// DALL-E 이미지 생성
app.post('/generate-image', async (req, res) => {
    try {
        const { prompt, size, model } = req.body;
        
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
            model: model,
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            quality: "standard", 
            response_format: "url"
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        const urls = response.data.data.map(item => item.url);
        return res.json({
            content: [{
                images: urls
            }]
        });

    } catch (error) {
        console.error('Error generating image:', error.response?.data || error.message);
        res.status(500).json({
            error: error.response?.data?.error?.message || '이미지 생성에 실패했습니다.'
        });
    }
});


// Stable-Diffusion 이미지 생성
app.post('/generate-stable-image', upload.none(), async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            throw new Error('Prompt is required');
        }

        const formData = new FormData();
        formData.append('prompt', prompt);
        formData.append('output_format', 'webp');
        
        const response = await axios.post(
            'https://api.stability.ai/v2beta/stable-image/generate/ultra',
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.STABLE_API_KEY}`,
                    'Accept': 'image/*',
                    ...formData.getHeaders()
                },
                responseType: 'arraybuffer'
            }
        );

        if (response.status === 200) {
            res.setHeader('Content-Type', 'image/webp');
            res.send(Buffer.from(response.data));
        } else {
            throw new Error(`Error: ${response.status}`);
        }

    } catch (error) {
        console.error('Error generating Stable Diffusion image:', 
            error.response ? 
            `Status: ${error.response.status}, Data: ${error.response.data}` : 
            error.message
        );
        
        res.status(500).json({
            error: 'Image generation failed: ' + 
                (error.response ? error.response.data : error.message)
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

