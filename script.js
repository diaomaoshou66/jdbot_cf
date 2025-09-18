// 将下面的URL替换为您Render后端的真实地址
const apiUrl = 'https://jd-bot-1.onrender.com/api/health';

// 页面加载时执行
window.onload = function() {
    const statusElement = document.getElementById('status');

    // 使用 fetch 向后端API发起请求
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应错误');
            }
            return response.json();
        })
        .then(data => {
            console.log('从后端收到的数据:', data);
            // 如果后端返回 {"status": "ok"}
            if (data.status === 'ok') {
                statusElement.textContent = '连接成功 (OK)';
                statusElement.style.color = 'green';
            } else {
                statusElement.textContent = '连接异常';
                statusElement.style.color = 'orange';
            }
        })
        .catch(error => {
            console.error('获取后端状态失败:', error);
            statusElement.textContent = '连接失败';
            statusElement.style.color = 'red';
        });
};
