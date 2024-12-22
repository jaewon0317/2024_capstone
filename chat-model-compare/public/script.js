window.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('modeToggle');
    const modelGroups = document.querySelector('.model-groups');
    const dalleSection = document.querySelector('.dalle-section');
    const chatSection = document.querySelector('.chat-section');
   
    
    modeToggle.addEventListener('change', function() {
        if (this.checked) {
            // 이미지 모드
            modelGroups.style.opacity = '0';
            chatSection.style.opacity = '0';
            setTimeout(() => {
                modelGroups.style.display = 'none';
                chatSection.style.display = 'none';
                dalleSection.style.display = 'block';
                setTimeout(() => {
                    dalleSection.style.opacity = '1';
                }, 50);
            }, 300);
        } else {
            // 텍스트 모드
            dalleSection.style.opacity = '0';
            setTimeout(() => {
                dalleSection.style.display = 'none';
                modelGroups.style.display = 'flex';
                chatSection.style.display = 'block';
                setTimeout(() => {
                    modelGroups.style.opacity = '1';
                    chatSection.style.opacity = '1';
                }, 50);
            }, 300);
        }
    });


    // 마크다운 변환 설정
    marked.setOptions({
        breaks: true,  // 줄바꿈 허용
        gfm: true      // GitHub Flavored Markdown 활성화
    });

    // 마크다운 렌더링 함수
    function renderMarkdown(text) {
        const htmlContent = marked.parse(text);
        
        // 코드 블록에 하이라이팅 적용
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });

        return htmlContent;
    }

    // 모델 정보
    const modelInfo = {
        // OpenAI 모델
        'o1-preview': {
            name: 'GPT-o1-preview',
            description: '다양한 분야의 복잡한 문제 해결에 특화된 추론 모델',
            type: 'gpt'
        },
        'o1-mini': {
            name: 'GPT-o1-mini',
            description: '코딩, 수학, 과학 분야에 특화된 빠르고 경제적인 추론 모델',
            type: 'gpt'
        },
        'chatgpt-4o-latest': {
            name: 'GPT-4o',
            description: '복잡하고 다단계 작업을 위한 범용적 지능형 모델',
            type: 'gpt'
        },
        'gpt-4o-mini': {
            name: 'GPT-4o Mini',
            description: '빠르고 가벼운 작업을 위한 경제적이고 지능적인 소형 모델',
            type: 'gpt'
        },
        'gpt-4-turbo': {
            name: 'GPT-4 Turbo',
            description: '이전 세대의 고성능 지능형 모델',
            type: 'gpt'
        },
        'gpt-4': {
            name: 'GPT-4',
            description: '이전 세대의 고성능 지능형 모델',
            type: 'gpt'
        },
        'gpt-3.5-turbo': {
            name: 'GPT-3.5 Turbo',
            description: '간단한 작업을 위한 빠르고 경제적인 모델',
            type: 'gpt'
        },
        // Claude 모델
        'claude-3-opus-20240229': {
            name: 'Claude 3 Opus',
            description: '최고 성능의 모델',
            type: 'claude'
        },
        'claude-3-sonnet-20240229': {
            name: 'Claude 3 Sonnet',
            description: '균형잡힌 성능',
            type: 'claude'
        },
        'claude-3-haiku-20240307': {
            name: 'Claude 3 Haiku',
            description: '빠른 응답 속도',
            type: 'claude'
        },
        // Gemini 모델
        'gemini-2.0-flash-exp': {
            name: 'Gemini 2.0 Flash',
            description: '최신 버전, 강화된 추론 능력',
            type: 'gemini'
        },
        'gemini-1.5-pro': {
            name: 'Gemini 1.5 Pro',
            description: '최신 버전, 강화된 추론 능력',
            type: 'gemini'
        },
        'gemini-1.5-flash': {
            name: 'Gemini 1.5 Flash',
            description: '빠른 응답에 최적화',
            type: 'gemini'
        },
        'gemini-1.0-pro': {
            name: 'Gemini 1.0 Pro',
            description: '범용 모델',
            type: 'gemini'
        },
        // Mistral 모델
        'mistral-large-latest': {
            name: 'Mistral Large',
            description: '가장 강력한 성능의 대규모 언어 모델',
            type: 'mistral'
        },
        'mistral-small-latest': {
            name: 'Mistral Small',
            description: '빠른 응답과 효율성에 최적화된 경량 모델',
            type: 'mistral'
        },
        // Grok 모델
        'grok-2-1212': {
            name: 'Grok 2',
            description: 'X.AI의 최신 Grok 2 모델',
            type: 'grok'
        },
        'grok-beta': {
            name: 'Grok Beta',
            description: 'X.AI의 기존 대화형 AI 모델',
            type: 'grok'
        },
        // perplexity-LLaMA 모델
        'llama-3.1-sonar-huge-128k-online': {
            name: 'LLaMA 3 Sonar Huge',
            description: '최고 성능의 실시간 검색 모델',
            type: 'perplexity'
        },
        'llama-3.1-sonar-large-128k-online': {
            name: 'LLaMA 3 Sonar Large',
            description: '균형잡힌 성능의 검색 모델',
            type: 'perplexity'
        },
        'llama-3.1-sonar-small-128k-online': {
            name: 'LLaMA 3 Sonar Small',
            description: '빠른 응답의 기본 검색 모델',
            type: 'perplexity'
        },
        // LLaMA 모델
        'llama3.3-70b': {
            name: 'LLaMA 3.3 70B',
            description: 'LLaMA 3.3 70B 모델',
            type: 'llama'
        },
        'llama3.2-90b-vision': {
            name: 'LLaMA 3.2 90B Vision',
            description: 'LLaMA 3.2 90B 시각 처리 가능 모델',
            type: 'llama'
        },
        'llama3.2-11b-vision': {
            name: 'LLaMA 3.2 11B Vision',
            description: 'LLaMA 3.2 11B 시각 처리 가능 모델',
            type: 'llama'
        },
        'llama3.2-3b': {
            name: 'LLaMA 3.2 3B',
            description: 'LLaMA 3.2 3B 경량 모델',
            type: 'llama'
        },
        'llama3.2-1b': {
            name: 'LLaMA 3.2 1B',
            description: 'LLaMA 3.2 1B 초경량 모델',
            type: 'llama'
        },
        'llama3.1-405b': {
            name: 'LLaMA 3.1 405B',
            description: 'LLaMA 3.1 대규모 405B 모델',
            type: 'llama'
        },
        'llama3.1-70b': {
            name: 'LLaMA 3.1 70B',
            description: 'LLaMA 3.1 70B 모델',
            type: 'llama'
        },
        'llama3.1-8b': {
            name: 'LLaMA 3.1 8B',
            description: 'LLaMA 3.1 8B 경량 모델',
            type: 'llama'
        },
        'llama3-70b': {
            name: 'LLaMA 3 70B',
            description: 'LLaMA 3 70B 모델',
            type: 'llama'
        },
        'llama3-8b': {
            name: 'LLaMA 3 8B',
            description: 'LLaMA 3 8B 경량 모델',
            type: 'llama'
        },
        // HyperClovaX 모델
        'hcx-003': {
            name: 'HCX-003',
            description: '최신 CLOVA Studio HyperX 모델',
            type: 'hyperx'
        },
        'hcx-dash-001': {
            name: 'HCX-DASH-001',
            description: '경량화된 최신 CLOVA Studio HyperX 모델',
            type: 'hyperx'
        }
    };

    // 모델 선택 관리
    const modelOptions = document.querySelectorAll('.model-option');
    modelOptions.forEach(option => {
        option.addEventListener('click', () => {
            option.classList.toggle('selected');
        });
    });

    // 설정값 표시 업데이트
    document.getElementById('temperatureRange').addEventListener('input', function() {
        document.getElementById('temperatureValue').textContent = this.value;
    });

    document.getElementById('maxTokensRange').addEventListener('input', function() {
        document.getElementById('maxTokensValue').textContent = this.value;
    });

    // Enter 키로 메시지 전송 (Shift + Enter는 줄바꿈)
    document.getElementById('userInput').addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 채팅 초기화
    window.clearChat = function() {
        document.getElementById('userInput').value = '';
        document.getElementById('response-container').innerHTML = '';
    }

    // 메시지 전송 및 응답 처리
    window.sendMessage = async function() {
        const userInput = document.getElementById('userInput').value;
        const loadingDiv = document.getElementById('loading');
        const responseContainer = document.getElementById('response-container');
        const temperature = document.getElementById('temperatureRange').value;
        const maxTokens = document.getElementById('maxTokensRange').value;

        // 선택된 모델들 가져오기
        const selectedModels = Array.from(document.querySelectorAll('.model-option.selected'))
            .map(option => option.dataset.model);

        if (!userInput.trim()) {
            alert('메시지를 입력해주세요.');
            return;
        }

        if (selectedModels.length === 0) {
            alert('하나 이상의 모델을 선택해주세요.');
            return;
        }

        loadingDiv.style.display = 'block';
        responseContainer.innerHTML = '';

        // 각 선택된 모델에 대해 응답 요청
        for (const model of selectedModels) {
            try {
                const response = await fetch('http://localhost:3000/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: userInput,
                        model: model,
                        temperature: parseFloat(temperature),
                        maxTokens: parseInt(maxTokens)
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                const modelResponseDiv = document.createElement('div');
                modelResponseDiv.className = 'response-card';
                modelResponseDiv.innerHTML = `
                    <div class="response-header">
                        <div class="model-info">${modelInfo[model].name} - ${modelInfo[model].description}</div>
                    </div>
                    <div class="response-content">
                        ${renderMarkdown(data.content && data.content[0] ? data.content[0].text : '응답을 생성할 수 없습니다.')}
                    </div>
                `;
                responseContainer.appendChild(modelResponseDiv);

            } catch (error) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'response-card';
                errorDiv.innerHTML = `
                    <div class="response-header">
                        <div class="model-info">${modelInfo[model].name}</div>
                    </div>
                    <div class="response-content error">
                        오류가 발생했습니다: ${error.message}
                    </div>
                `;
                responseContainer.appendChild(errorDiv);
            }
        }

        loadingDiv.style.display = 'none';
    }
});

// 테마 전환 기능
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.innerHTML = '🌙 Dark';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '☀️ Light';
    }
    
    localStorage.setItem('theme', body.getAttribute('data-theme') || 'light');
}

// 페이지 로드 시 저장된 테마 적용
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        const themeToggle = document.querySelector('.theme-toggle');
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '☀️ Light';
        }
    }
});


// 이미지 생성 함수
async function generateImage() {
    const selectedModels = document.querySelectorAll('.dalle-section .model-option.selected');
    if (selectedModels.length === 0) {
        const errorDiv = document.getElementById('dalleError');
        errorDiv.textContent = '이미지 생성 모델을 선택해주세요.';
        errorDiv.style.display = 'block';
        return;
    }

    const prompt = document.getElementById('dallePrompt').value;
    const loading = document.getElementById('dalleLoading');
    const errorDiv = document.getElementById('dalleError');
    const responseContainer = document.getElementById('dalle-response-container');
    
    if (!prompt.trim()) {
        errorDiv.textContent = '이미지 설명을 입력해주세요.';
        errorDiv.style.display = 'block';
        return;
    }

    loading.style.display = 'block';
    errorDiv.style.display = 'none';
    responseContainer.innerHTML = '';

    for (const selectedModel of selectedModels) {
        try {
            const model = selectedModel.dataset.model;
            let response;
            
            if (model.startsWith('dall-e')) {
                // DALL-E 모델 처리
                response = await fetch('http://localhost:3000/generate-image', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        prompt,
                        model
                    })
                });

                if (!response.ok) {
                    throw new Error('DALL-E 이미지 생성에 실패했습니다.');
                }

                const data = await response.json();
                const imageUrl = data.content[0].images[0];
                
                // DALL-E 응답 카드 생성
                const cardDiv = document.createElement('div');
                cardDiv.className = 'response-card';
                cardDiv.innerHTML = `
                    <div class="response-header">
                        <div class="model-info">${selectedModel.querySelector('.model-name').textContent}</div>
                    </div>
                    <div class="response-content">
                        <div class="image-wrapper">
                            <img src="${imageUrl}" alt="Generated image">
                        </div>
                    </div>
                `;
                
                responseContainer.appendChild(cardDiv);
            } else if (model.startsWith('stable')) {
                // Stable Diffusion 모델 처리
                const formData = new FormData();
                formData.append('prompt', prompt);
                formData.append('output_format', 'webp');
            
                response = await fetch('http://localhost:3000/generate-stable-image', {
                    method: 'POST',
                    body: formData  // FormData 직접 전송, Content-Type 헤더는 자동으로 설정됨
                });
            
                if (!response.ok) {
                    throw new Error('Stable Diffusion 이미지 생성에 실패했습니다.');
                }
            
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                
                // Stable Diffusion 응답 카드 생성
                const cardDiv = document.createElement('div');
                cardDiv.className = 'response-card';
                cardDiv.innerHTML = `
                    <div class="response-header">
                        <div class="model-info">${selectedModel.querySelector('.model-name').textContent}</div>
                    </div>
                    <div class="response-content">
                        <div class="image-wrapper">
                            <img src="${imageUrl}" alt="Generated image">
                        </div>
                    </div>
                `;
                
                responseContainer.appendChild(cardDiv);
            }
                

        } catch (error) {
            // 에러 처리
            const cardDiv = document.createElement('div');
            cardDiv.className = 'response-card';
            cardDiv.innerHTML = `
                <div class="response-header">
                    <div class="model-info">${selectedModel.querySelector('.model-name').textContent}</div>
                </div>
                <div class="response-content error">
                    이미지 생성 오류: ${error.message}
                </div>
            `;
            responseContainer.appendChild(cardDiv);
            console.error('이미지 생성 오류:', error);
        }
    }

    loading.style.display = 'none';
}

// 이미지 초기화 함수
function clearDalleImages() {
    document.getElementById('dallePrompt').value = '';
    document.getElementById('dalle-response-container').innerHTML = '';
    document.getElementById('dalleError').style.display = 'none';
}