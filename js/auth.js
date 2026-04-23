// ============================================================
// AUTH.JS - Mock Authentication System & Authorization
// ============================================================

const PROTECTED_PAGES = ['index.html', 'hsk1.html', 'hsk2.html', 'pinyin.html', 'admin.html', '']; // '' represents root
const CURRENT_PAGE = window.location.pathname.split('/').pop() || 'index.html';

// Danh sách Email có quyền Admin
const ADMIN_EMAILS = ['trungho20050@gmail.com', 'admin@trungnihao.com'];

function isAdmin(user) {
  return user && user.email && ADMIN_EMAILS.includes(user.email.toLowerCase());
}

function checkAuth() {
  const userStr = localStorage.getItem('nhim_user');
  const isProtected = PROTECTED_PAGES.includes(CURRENT_PAGE);

  if (isProtected && !userStr) {
    window.location.href = 'login.html';
  } else if (CURRENT_PAGE === 'login.html' && userStr) {
    window.location.href = 'index.html';
  } else if (CURRENT_PAGE === 'admin.html' && userStr) {
    const user = JSON.parse(userStr);
    if (!isAdmin(user)) {
      alert('Bạn không có quyền truy cập trang Quản Trị!');
      window.location.href = 'index.html';
    }
  }
}

// Chạy checkAuth ngay lập tức chặn render nếu chưa đăng nhập
checkAuth();

// Hàm xử lý sau khi DOM tải xong
document.addEventListener('DOMContentLoaded', () => {
  const userStr = localStorage.getItem('nhim_user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      // Cập nhật giao diện sidebar user
      const nameElls = document.querySelectorAll('.user-name');
      const levelElls = document.querySelectorAll('.user-level');
      
      // Sửa lỗi font chữ cũ đang bị lưu cặn trong trình duyệt
      if (user.level && (user.level.includes('SÆ¡') || user.level.includes('cáº¥p') || user.level.includes('àI'))) {
        user.level = ' HSK Sơ cấp';
        localStorage.setItem('nhim_user', JSON.stringify(user));
      }

      nameElls.forEach(el => el.textContent = user.name || 'Học viên');
      levelElls.forEach(el => el.textContent = user.level || ' HSK Sơ cấp');

      // Ẩn/Hiện Menu Quản Lý Từ Vựng – chỉ hiện với admin email đăng ký
      const adminNavBtn = document.getElementById('nav-admin');
      if (adminNavBtn) {
        if (!isAdmin(user)) {
          adminNavBtn.style.display = 'none';
        } else {
          adminNavBtn.style.display = 'flex';
        }
      }
    } catch (e) {
      console.error('Lỗi phân tích dữ liệu user:', e);
    }
  }
});

window.logout = function() {
  if(confirm("Bạn có chắc chắn muốn đăng xuất?")) {
    localStorage.removeItem('nhim_user');
    window.location.href = 'login.html';
  }
}
