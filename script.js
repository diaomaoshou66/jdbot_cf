// --- 配置 ---
// !!! 重要：请将下面的 URL 替换为您 Render 后端的真实地址 !!!
const API_URL_BASE = 'https://jd-bot-1.onrender.com'; 

// --- DOM 元素 ---
const loginOverlay = document.getElementById('login-overlay');
const appContainer = document.getElementById('app-container');
const apiKeyInput = document.getElementById('api-key-input');
const loginButton = document.getElementById('login-button');
const loginError = document.getElementById('login-error');

const productSelect = document.getElementById('product-select');
const cardCodesTextarea = document.getElementById('card-codes-textarea');
const addCardsButton = document.getElementById('add-cards-button');
const buttonText = document.querySelector('#add-cards-button .button-text');
const spinner = document.querySelector('#add-cards-button .spinner');
const resultMessage = document.getElementById('result-message');

// --- 函数 ---

/**
 * 显示消息
 * @param {string} message - 要显示的消息
 * @param {boolean} isError - 是否是错误消息
 */
function showMessage(message, isError = false) {
    resultMessage.textContent = message;
    resultMessage.className = 'message'; // 重置 class
    if (message) {
        resultMessage.classList.add(isError ? 'error' : 'success');
    }
}

/**
 * 切换加载状态
 * @param {boolean} isLoading - 是否正在加载
 */
function setLoading(isLoading) {
    if (isLoading) {
        buttonText.classList.add('hidden');
        spinner.classList.remove('hidden');
        addCardsButton.disabled = true;
    } else {
        buttonText.classList.remove('hidden');
        spinner.classList.add('hidden');
        addCardsButton.disabled = false;
    }
}

/**
 * 从后端 API 获取商品列表并填充下拉菜单
 * @param {string} apiKey - 管理员 API 密钥
 */
async function fetchProducts(apiKey) {
    try {
        const response = await fetch(`${API_URL_BASE}/api/products`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (response.status === 401) {
            throw new Error('API 密钥无效或未授权。');
        }
        if (!response.ok) {
            throw new Error(`网络响应错误: ${response.statusText}`);
        }

        const products = await response.json();
        
        productSelect.innerHTML = '<option value="">-- 请选择一个商品 --</option>'; // 清空并添加默认选项
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = `${product.name} (ID: ${product.id})`;
            productSelect.appendChild(option);
        });

        return true; // 表示成功

    } catch (error) {
        console.error('获取商品失败:', error);
        loginError.textContent = error.message;
        sessionStorage.removeItem('adminApiKey'); // 验证失败，移除密钥
        return false; // 表示失败
    }
}

/**
 * 提交卡密到后端 API
 */
async function addInventory() {
    const apiKey = sessionStorage.getItem('adminApiKey');
    if (!apiKey) {
        showMessage('认证已过期，请刷新页面重新登录。', true);
        return;
    }

    const productId = productSelect.value;
    const cardCodes = cardCodesTextarea.value.trim();

    if (!productId) {
        showMessage('请选择一个商品。', true);
        return;
    }
    if (!cardCodes) {
        showMessage('请粘贴至少一个卡密。', true);
        return;
    }
    
    setLoading(true);
    showMessage(''); // 清除旧消息

    try {
        const response = await fetch(`${API_URL_BASE}/api/inventory/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                product_id: parseInt(productId),
                card_codes: cardCodes
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || '未知错误');
        }

        showMessage(`成功添加 ${result.added} 个卡密，跳过 ${result.skipped} 个重复卡密。`);
        cardCodesTextarea.value = ''; // 成功后清空

    } catch (error) {
        console.error('添加卡密失败:', error);
        showMessage(`操作失败: ${error.message}`, true);
    } finally {
        setLoading(false);
    }
}

/**
 * 处理登录逻辑
 */
async function handleLogin() {
    const apiKey = apiKeyInput.value.trim();
    if (!apiKey) {
        loginError.textContent = 'API 密钥不能为空。';
        return;
    }
    loginError.textContent = '';
    loginButton.disabled = true;
    loginButton.textContent = '正在验证...';

    // 将密钥存入 session storage
    sessionStorage.setItem('adminApiKey', apiKey);

    // 尝试获取商品列表以验证密钥
    const success = await fetchProducts(apiKey);

    if (success) {
        loginOverlay.classList.remove('visible');
        appContainer.classList.remove('hidden');
    } else {
        // fetchProducts 内部已经处理了错误信息显示
        loginButton.disabled = false;
        loginButton.textContent = '登录';
    }
}


// --- 事件监听 ---
loginButton.addEventListener('click', handleLogin);
apiKeyInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        handleLogin();
    }
});

addCardsButton.addEventListener('click', addInventory);

// --- 初始化 ---
document.addEventListener('DOMContentLoaded', () => {
    const storedApiKey = sessionStorage.getItem('adminApiKey');
    if (storedApiKey) {
        loginButton.disabled = true;
        loginButton.textContent = '正在验证...';
        apiKeyInput.value = storedApiKey;
        fetchProducts(storedApiKey).then(success => {
            if (success) {
                loginOverlay.classList.remove('visible');
                appContainer.classList.remove('hidden');
            } else {
                loginOverlay.classList.add('visible');
                appContainer.classList.add('hidden');
                loginButton.disabled = false;
                loginButton.textContent = '登录';
            }
        });
    } else {
        loginOverlay.classList.add('visible');
        appContainer.classList.add('hidden');
    }
});
