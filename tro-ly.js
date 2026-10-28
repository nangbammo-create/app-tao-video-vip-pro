/* =========================================================
   TRỢ LÝ ẢO TƯ VẤN 24/7 – Chương trình Trải Nghiệm App Tạo Video VIP Pro
   Gắn vào bất kỳ trang nào: <script src="tro-ly.js"></script>
   ========================================================= */
(() => {
  const TRO_LY = {
    ten: 'Nàng Ba',
    avatar: 'images/nang-ba-mmo.jpg',
    // Link nhóm Zalo riêng (dán vào đây khi có). Để trống thì dẫn về Zalo cá nhân.
    zaloNhom: 'https://zalo.me/g/dkeercivchvkddpj1avo',
    zaloCaNhan: 'https://zalo.me/0785568539',
    // Kết nối CRM (Supabase): lấy từ CONFIG trong index.html
    crm: window.CRM || null,
    // true = dùng câu trả lời sửa trong trang quản trị (Supabase); lỗi mạng thì tự dùng kịch bản có sẵn bên dưới.
    dungKichBanQuanTri: false,
    // Số giây chờ trước khi trợ lý chủ động chào khách
    chaoSau: 12,
  };

  const linkZalo = () => TRO_LY.zaloNhom || TRO_LY.zaloCaNhan;

  /* ---------- KỊCH BẢN TƯ VẤN (dùng khi chưa bật AI hoặc AI lỗi) ---------- */
  const KICH_BAN = [
    { id: 'nguoi_may', tu: ['nguoi that', 'la may', 'robot', 'bot', 'la ai vay', 'tro ly ao', 'chatgpt'],
      tra: ['Dạ, đây là phần trả lời tự động 24/7 của Ba, để mình hỏi lúc nào cũng có câu trả lời ngay ạ 😊 Những câu cần tư vấn sâu hơn, mình vào nhóm Zalo là có chính Ba và đội ngũ hỗ trợ trực tiếp luôn nhé.'],
      zalo: true },
    { id: 'chao', tu: ['xin chao', 'chao', 'hello', 'hi', 'alo', 'co ai khong', 'shop oi', 'ad oi'],
      tra: ['Dạ Ba chào {ten} ạ 🌷 Rất vui vì mình ghé xem chương trình <b>Trải Nghiệm – Sở Hữu – Hợp Tác Affiliate App Tạo Video VIP Pro</b>. Mình đang muốn tìm hiểu về phí giữ suất, quyền lợi hay hoa hồng 50% ạ?',
            'Chào {ten} nha 👋 Ba đây. Mình cứ hỏi thoải mái, chuyện gì về chương trình App Tạo Video VIP Pro Ba cũng giải đáp được ạ.'] },
    { id: 'phi', tu: ['gia', 'bao nhieu', 'hoc phi', 'chi phi', 'bao tien', 'nhieu tien', 'dat khong', 'dat qua', 'phi giu suat', '55', 'moi cafe', 'co mat phi', 'ton tien'],
      tra: ['Dạ phí giữ suất là <b>55.000đ</b> thôi ạ ☕ (như mời Ba ly cà phê). {ten} điền form rồi quét mã QR với nội dung <b>MOI CAFE BA</b> là xong. Sau đó được trải nghiệm app miễn phí, feedback 1 tháng và Zoom/Video hướng dẫn chi tiết cách sử dụng nha.'],
      nut: ['Sở hữu app giảm 30% là sao?', 'Giữ suất thế nào?'] },
    { id: 'quyen_loi', tu: ['duoc gi', 'quyen loi', 'loi ich', 'nhan duoc gi', 'gom nhung gi', 'gom gi'],
      tra: ['Dạ, chương trình có 3 chặng rõ ràng ạ ✨<br>1️⃣ <b>TRẢI NGHIỆM:</b> dùng app miễn phí, feedback trong 1 tháng, Zoom/Video hướng dẫn chi tiết cách sử dụng<br>2️⃣ <b>SỞ HỮU:</b> mua app với giá ưu đãi <b>giảm 30%</b> so với giá gốc<br>3️⃣ <b>HỢP TÁC AFFILIATE:</b> giới thiệu app, nhận <b>hoa hồng 50%</b>'],
      nut: ['Hoa hồng affiliate 50% là sao?', 'Giữ suất thế nào?'] },
    { id: 'so_huu', tu: ['so huu', 'mua app', 'giam 30', 'uu dai', 'gia goc'],
      tra: ['Dạ sau thời gian trải nghiệm, nếu {ten} muốn sở hữu app để dùng lâu dài thì được mua với <b>giá ưu đãi giảm 30% so với giá gốc</b> ạ 💎 Chỉ dành cho thành viên chương trình thôi nha.'],
      nut: ['Hoa hồng affiliate 50% là sao?', 'Giữ suất thế nào?'] },
    { id: 'affiliate', tu: ['affiliate', 'hoa hong', '50%', 'gioi thieu', 'tiep thi lien ket'],
      tra: ['Dạ khi {ten} sở hữu app và tham gia <b>hợp tác affiliate</b>, mỗi lượt giới thiệu App Tạo Video VIP Pro thành công mình nhận <b>hoa hồng 50%</b> ạ 🤝 Cách làm được hướng dẫn chi tiết trong nhóm Zalo riêng nha.'],
      nut: ['Sở hữu app giảm 30% là sao?', 'Giữ suất thế nào?'] },
    { id: 'trai_nghiem', tu: ['trai nghiem', 'dung thu', 'free', 'mien phi'],
      tra: ['Dạ sau khi giữ suất (55.000đ), {ten} được <b>cấp quyền dùng app miễn phí</b> đầy đủ tính năng trong suốt chương trình, đồng hành feedback trong 1 tháng luôn ạ 🆓'],
      nut: ['Sở hữu app giảm 30% là sao?', 'Giữ suất thế nào?'] },
    { id: 'zoom', tu: ['zoom', 'hoc online', 'huong dan', 'nganh hang'],
      tra: ['Dạ là buổi <b>Zoom/Video hướng dẫn chi tiết cách sử dụng</b> app cho {ten} đó ạ, kèm ví dụ triển khai và giải đáp vướng mắc luôn. Lịch được gửi trong nhóm riêng khi mình tham gia nha.'] },
    { id: 'dang_ky', tu: ['dang ky', 'giu suat', 'tham gia', 'dang ki', 'ghi danh', 'dat cho'],
      tra: ['Dạ đơn giản lắm ạ ⚡ {ten} bấm nút <b>GIỮ SUẤT</b>, điền form 20 giây, rồi quét mã QR <b>55.000đ</b> với nội dung <b>MOI CAFE BA</b> là xong. Sau đó vào nhóm Zalo để nhận quyền dùng app nha.'],
      nut: ['Phí giữ suất bao nhiêu?', 'Tôi được gì khi tham gia?'] },
    { id: 'zalo', tu: ['zalo', 'nhom', 'group', 'lien he', 'tu van truc tiep', 'gap ba'],
      tra: ['Dạ {ten} vào nhóm Zalo riêng của chương trình nha 👉 <b>Nhóm Zalo</b> – trong nhóm có hướng dẫn nhận app, lịch Zoom/Video hướng dẫn và được Ba hỗ trợ trực tiếp ạ.'],
      zalo: true },
    { id: 'chuong_trinh', tu: ['chuong trinh', 'app vip pro', 'app gi', 'noi dung'],
      tra: ['Dạ chương trình <b>Trải Nghiệm – Sở Hữu – Hợp Tác Affiliate App Tạo Video VIP Pro</b> có 3 chặng ạ: ① <b>Trải nghiệm</b> app miễn phí + feedback 1 tháng + Zoom/Video hướng dẫn chi tiết cách sử dụng ② <b>Sở hữu</b> app giảm 30% so với giá gốc ③ <b>Hợp tác affiliate</b> với hoa hồng 50%. Phí giữ suất chỉ 55.000đ thôi ạ ☕'],
      nut: ['Phí giữ suất bao nhiêu?', 'Giữ suất thế nào?'] },
  ];

  const TRA_LOI_KHAC = [
    'Câu này Ba muốn tư vấn trực tiếp cho {ten} mới kỹ được ạ 💛 Mình để lại <b>số Zalo</b> ngay trong khung chat này, Ba sẽ nhắn riêng cho mình nhé. Hoặc vào nhóm Zalo để hỏi thoải mái ạ.',
    'Câu này hay quá, Ba muốn trả lời {ten} thật kỹ nên mời mình vào nhóm Zalo riêng để trao đổi trực tiếp nhé 💛 Trong nhóm còn có nhiều thông tin về chương trình nữa ạ.',
    'Dạ Ba ghi nhận câu hỏi của {ten} rồi ạ. Để được giải đáp cặn kẽ và đúng với trường hợp của mình nhất, mình vào nhóm Zalo riêng nhé – vừa có người tư vấn trực tiếp, vừa nhận được quyền dùng app ạ 🎁',
  ];
  const NUT_MAC_DINH = ['Phí giữ suất bao nhiêu?', 'Sở hữu app giảm 30% là sao?', 'Hoa hồng affiliate 50% là sao?', 'Giữ suất thế nào?'];
  let kichBan = KICH_BAN;

  /* ---------- XỬ LÝ CHỮ ---------- */
  const boDau = s => ' ' + s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ') + ' ';
  const chon = arr => arr[Math.floor(Math.random() * arr.length)];
  let tenKhach = '';
  const goi = s => s.replace(/\{ten\}/g, tenKhach ? `bạn ${tenKhach}` : 'bạn').replace(/^(bạn|mình)/, c => c[0].toUpperCase() + c.slice(1));

  function timTen(raw) {
    const m = raw.normalize('NFC').match(/(?:tên tôi là|tên mình là|tôi tên là|mình tên là|em tên là|tôi tên|mình tên|em tên|tên là)\s+(\p{L}+(?:\s+\p{L}+)?)/iu);
    if (m) tenKhach = m[1].trim().split(' ').pop().replace(/^./, c => c.toUpperCase());
  }

  function traLoiKichBan(raw) {
    const t = boDau(raw);
    let tot = null, diem = 0;
    for (const k of kichBan) {
      const d = k.tu.reduce((n, w) => n + (w && t.includes(' ' + w + ' ') ? w.split(' ').length : 0), 0) * (k.uuTien || 1);
      if (d > diem) { diem = d; tot = k; }
    }
    if (!tot) return { text: goi(chon(TRA_LOI_KHAC)), zalo: true, nut: NUT_MAC_DINH.slice(0, 2) };
    return { text: goi(chon(tot.tra)), zalo: !!tot.zalo, nut: tot.nut || (tot.zalo ? [] : NUT_MAC_DINH.slice(0, 2)) };
  }

  /* ---------- GIAO DIỆN ---------- */
  const css = `
  #tl-nut{position:fixed;right:16px;bottom:20px;z-index:60;width:62px;height:62px;border-radius:50%;border:2px solid #f5b04c;padding:0;cursor:pointer;background:#0e2a1b;box-shadow:0 10px 30px -6px rgba(234,88,12,.6)}
  #tl-nut img{width:100%;height:100%;border-radius:50%;object-fit:cover;object-position:top}
  #tl-nut .tl-cham{position:absolute;top:2px;right:2px;width:14px;height:14px;border-radius:50%;background:#22c55e;border:2px solid #0e2a1b}
  #tl-moi{position:fixed;right:16px;bottom:92px;z-index:60;max-width:250px;background:#fff;color:#111;border-radius:16px 16px 4px 16px;padding:10px 14px;font-size:14px;line-height:1.4;box-shadow:0 10px 30px rgba(0,0,0,.35);cursor:pointer;display:none}
  #tl-khung{position:fixed;right:16px;bottom:20px;z-index:70;width:370px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100vh - 100px);display:none;flex-direction:column;background:#0e2a1b;border:1px solid #1f4d2e;border-radius:22px;overflow:hidden;box-shadow:0 30px 80px -10px rgba(0,0,0,.7);font-family:inherit;color:#f2f7ef}
  #tl-khung.mo{display:flex}
  .tl-dau{display:flex;align-items:center;gap:10px;padding:12px 14px;background:linear-gradient(90deg,#ffd9a0,#f59e0b,#ea580c);color:#1a0f02}
  .tl-dau img{width:40px;height:40px;border-radius:50%;object-fit:cover;object-position:top;border:2px solid #fff}
  .tl-dau b{display:block;font-size:15px}.tl-dau small{font-size:12px;font-weight:600;opacity:.85}
  .tl-dong{margin-left:auto;background:rgba(7,11,22,.15);border:0;width:32px;height:32px;border-radius:50%;font-size:18px;cursor:pointer;color:#1a0f02}
  .tl-than{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}
  .tl-tin{max-width:85%;padding:10px 13px;border-radius:16px;font-size:14px;line-height:1.5;word-wrap:break-word}
  .tl-tin.bot{background:#091b11;border:1px solid #1f4d2e;border-bottom-left-radius:4px;align-self:flex-start}
  .tl-tin.khach{background:linear-gradient(90deg,#ffd9a0,#f59e0b,#ea580c);color:#1a0f02;font-weight:500;border-bottom-right-radius:4px;align-self:flex-end}
  .tl-tin b{color:#ffd9a0}.tl-tin.khach b{color:inherit}
  .tl-go{display:flex;gap:4px;padding:12px 14px}.tl-go i{width:7px;height:7px;border-radius:50%;background:#94a3b8;animation:tlb 1s infinite}.tl-go i:nth-child(2){animation-delay:.15s}.tl-go i:nth-child(3){animation-delay:.3s}
  @keyframes tlb{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-5px);opacity:1}}
  .tl-zalo{display:flex;align-items:center;justify-content:center;gap:8px;align-self:flex-start;max-width:85%;padding:10px 14px;border-radius:14px;background:#0068FF;color:#fff !important;font-weight:800;font-size:14px;text-decoration:none}
  .tl-chip{display:flex;flex-wrap:wrap;gap:6px}
  .tl-chip button{background:transparent;border:1px solid #f5b04c;color:#ffd9a0;border-radius:999px;padding:6px 11px;font-size:13px;cursor:pointer;font-family:inherit}
  .tl-chip button:hover{background:rgba(245,176,76,.15)}
  .tl-nhap{display:flex;gap:8px;padding:10px;border-top:1px solid #1f4d2e;background:#07130c}
  .tl-nhap input{flex:1;min-width:0;background:#091b11;border:1px solid #1f4d2e;border-radius:12px;padding:11px 12px;color:#fff;font-size:15px;font-family:inherit;outline:none}
  .tl-nhap input:focus{border-color:#f5b04c}
  .tl-nhap button{border:0;border-radius:12px;padding:0 16px;font-weight:900;cursor:pointer;background:linear-gradient(90deg,#ffd9a0,#f59e0b,#ea580c);color:#1a0f02}
  .tl-chan{font-size:11px;text-align:center;color:#64748b;padding:0 0 8px;background:#07130c}
  @media (max-width:639px){#tl-nut{bottom:92px}#tl-moi{bottom:164px}#tl-khung{right:0;bottom:0;top:0;width:100vw;max-width:100vw;height:auto;max-height:none;border-radius:0}}
  `;
  document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
  document.body.insertAdjacentHTML('beforeend', `
    <div id="tl-moi" role="button"></div>
    <button id="tl-nut" aria-label="Mở khung tư vấn"><img src="${TRO_LY.avatar}" alt=""><span class="tl-cham"></span></button>
    <div id="tl-khung" role="dialog" aria-label="Khung tư vấn">
      <div class="tl-dau"><img src="${TRO_LY.avatar}" alt=""><div><b>${TRO_LY.ten} · Tư vấn</b><small>● Trả lời tự động 24/7</small></div><button class="tl-dong" aria-label="Đóng">✕</button></div>
      <div class="tl-than" id="tl-than"></div>
      <form class="tl-nhap" id="tl-form"><input id="tl-o" maxlength="500" autocomplete="off" placeholder="Nhập câu hỏi của bạn…"><button type="submit">Gửi</button></form>
      <div class="tl-chan">Muốn nhắn trực tiếp với Ba? Zalo 0785 568 539</div>
    </div>`);

  const $ = id => document.getElementById(id);
  const than = $('tl-than'), khung = $('tl-khung'), nut = $('tl-nut'), moi = $('tl-moi'), o = $('tl-o');
  const lichSu = [];
  let daMo = false, dangTraLoi = false;

  const cuon = () => { than.scrollTop = than.scrollHeight; };
  function themTin(html, ai) {
    const d = document.createElement('div');
    d.className = 'tl-tin ' + ai;
    if (ai === 'khach') d.textContent = html; else d.innerHTML = html;
    than.appendChild(d); cuon();
  }
  function themZalo() {
    const a = document.createElement('a');
    a.className = 'tl-zalo'; a.href = linkZalo(); a.target = '_blank'; a.rel = 'noopener';
    a.textContent = TRO_LY.zaloNhom ? '🎁 Vào nhóm Zalo nhận quà tặng' : '💬 Nhắn Zalo nhận quà tặng';
    than.appendChild(a); cuon();
  }
  function themNut(ds) {
    if (!ds || !ds.length) return;
    const w = document.createElement('div'); w.className = 'tl-chip';
    ds.forEach(t => { const b = document.createElement('button'); b.type = 'button'; b.textContent = t; b.onclick = () => { w.remove(); xuLyNut(t); }; w.appendChild(b); });
    than.appendChild(w); cuon();
  }
  function xuLyNut(t) {
    if (t === 'Đăng ký ngay' || t === 'Mở form đăng ký') {
      themTin(t, 'khach');
      if (window.innerWidth < 640) dong();
      document.getElementById('dang-ky')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (t === 'Vào nhóm Zalo') { window.open(linkZalo(), '_blank', 'noopener'); return; }
    gui(t);
  }
  const dangGo = () => { const g = document.createElement('div'); g.className = 'tl-tin bot tl-go'; g.innerHTML = '<i></i><i></i><i></i>'; than.appendChild(g); cuon(); return g; };
  const doi = ms => new Promise(r => setTimeout(r, ms));

  /* Khách để lại số điện thoại trong chat -> lưu vào CRM kèm đoạn hội thoại */
  function timSdt(raw) {
    const m = raw.match(/(?:\+?84|0)(?:[\s.-]?\d){9}/);
    if (!m) return '';
    let d = m[0].replace(/\D/g, '');
    if (d.startsWith('84')) d = '0' + d.slice(2);
    return /^0\d{9}$/.test(d) ? d : '';
  }
  /* ---------- KẾT NỐI CRM (Supabase) ---------- */
  const crm = TRO_LY.crm && TRO_LY.crm.url && TRO_LY.crm.key ? TRO_LY.crm : null;
  const hdr = () => ({ apikey: crm.key, 'Content-Type': 'application/json' });
  const rpc = (ham, du) => fetch(`${crm.url}/rest/v1/rpc/${ham}`, { method: 'POST', headers: hdr(), body: JSON.stringify(du) });
  let phien = '';
  try { phien = sessionStorage.getItem('tl-phien') || ''; } catch (e) {}
  if (!phien) { phien = 'p-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10); try { sessionStorage.setItem('tl-phien', phien); } catch (e) {} }

  async function luuHoiThoai() {
    if (!crm) return;
    try { await rpc('luu_hoi_thoai', { p_phien: phien, p_tin_nhan: lichSu.slice(-200), p_nguon: window.NGUON_KHACH || 'Trực tiếp' }); } catch (e) {}
  }
  async function ghiKhachChat(sdt) {
    if (!crm) return;
    await luuHoiThoai();
    const nhuCau = lichSu.filter(m => m.role === 'user' && !timSdt(m.text)).map(m => m.text).join(' · ').slice(0, 500);
    try { await rpc('ghi_khach', { p_ho_ten: tenKhach, p_sdt: sdt, p_nhu_cau: nhuCau, p_nguon: window.NGUON_KHACH || 'Trực tiếp', p_kenh: 'Chat', p_phien: phien }); } catch (e) {}
  }
  // Tải kịch bản trả lời bạn sửa trong trang quản trị (lỗi thì dùng kịch bản có sẵn)
  const sangHtml = t => String(t).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
  const tach = t => String(t || '').split(',').map(x => x.trim()).filter(Boolean);
  if (crm && TRO_LY.dungKichBanQuanTri) {
    fetch(`${crm.url}/rest/v1/tra_loi_tu_dong?bat=eq.true&order=thu_tu.asc&select=*`, { headers: hdr() })
      .then(r => r.ok ? r.json() : [])
      .then(ds => {
        const moi = (ds || []).filter(r => r.tu_khoa && r.tra_loi).map(r => ({
          id: r.id, tu: tach(r.tu_khoa).map(w => boDau(w).trim()).filter(Boolean),
          tra: [sangHtml(r.tra_loi)], zalo: !!r.nut_zalo, nut: tach(r.goi_y),
        }));
        if (moi.length) kichBan = moi;
      }).catch(() => {});
  }

  async function gui(raw) {
    raw = raw.trim();
    if (!raw || dangTraLoi) return;
    dangTraLoi = true;
    themTin(raw, 'khach');
    lichSu.push({ role: 'user', text: raw });
    timTen(raw);
    const sdt = timSdt(raw);
    const g = dangGo();
    let tl;
    const batDau = Date.now();
    tl = sdt ? { text: goi(`Dạ Ba đã lưu số <b>${sdt}</b> rồi ạ 💛 Ba sẽ nhắn riêng tư vấn cho {ten} sớm nhất. Trong lúc chờ, mình vào nhóm Zalo để nhận app trước nhé!`), zalo: true, nut: [] } : traLoiKichBan(raw);
    // Thời gian "đang gõ" tự nhiên theo độ dài câu trả lời
    const cho = Math.min(2600, 700 + tl.text.length * 6) - (Date.now() - batDau);
    if (cho > 0) await doi(cho);
    g.remove();
    themTin(tl.text, 'bot');
    lichSu.push({ role: 'model', text: tl.text.replace(/<[^>]+>/g, ' ') });
    if (tl.zalo) themZalo();
    themNut(tl.nut);
    dangTraLoi = false;
    if (sdt) ghiKhachChat(sdt); else luuHoiThoai();
  }

  async function mo() {
    khung.classList.add('mo'); nut.style.display = 'none'; moi.style.display = 'none';
    if (!daMo) {
      daMo = true;
      const g = dangGo(); await doi(900); g.remove();
      themTin(`Dạ, Ba chào bạn 🌷 Đây là khung tư vấn tự động 24/7 của <b>Nàng Ba MMO</b>.<br><br>Bạn đang tìm hiểu chương trình <b>Trải Nghiệm App Tạo Video VIP Pro</b> phải không ạ? Bạn có băn khoăn gì, cứ hỏi Ba thoải mái nhé 😊`, 'bot');
      lichSu.push({ role: 'model', text: 'Chào bạn, Ba đây (tư vấn tự động 24/7 của Nàng Ba MMO). Bạn có băn khoăn gì cứ hỏi nhé.' });
      themNut(NUT_MAC_DINH);
    }
    if (window.innerWidth >= 640) o.focus();
  }
  function dong() { khung.classList.remove('mo'); nut.style.display = ''; }

  nut.onclick = mo; moi.onclick = mo;
  khung.querySelector('.tl-dong').onclick = dong;
  $('tl-form').onsubmit = e => { e.preventDefault(); const v = o.value; o.value = ''; gui(v); };

  setTimeout(() => {
    if (daMo) return;
    moi.innerHTML = '👋 Chào bạn! Ba có thể giúp gì cho bạn về chương trình App Tạo Video VIP Pro không ạ?';
    moi.style.display = 'block';
  }, TRO_LY.chaoSau * 1000);
})();
