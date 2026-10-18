/* =========================================================
   TRỢ LÝ ẢO TƯ VẤN 24/7 – Chương trình Đồng Hành 30 Ngày
   Gắn vào bất kỳ trang nào: <script src="tro-ly.js"></script>
   ========================================================= */
(() => {
  const TRO_LY = {
    ten: 'Phạm Dinh',
    avatar: 'images/companion.jpg',
    // Link nhóm Zalo riêng (dán vào đây khi có). Để trống thì dẫn về Zalo cá nhân.
    zaloNhom: '',
    zaloCaNhan: 'https://zalo.me/0915244329',
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
      tra: ['Dạ, đây là phần trả lời tự động 24/7 của Dinh, để mình hỏi lúc nào cũng có câu trả lời ngay ạ 😊 Những câu cần tư vấn sâu hơn, mình vào nhóm Zalo là có chính Dinh và đội ngũ hỗ trợ trực tiếp luôn nhé.'],
      zalo: true },
    { id: 'chao', tu: ['xin chao', 'chao', 'hello', 'hi', 'alo', 'co ai khong', 'shop oi', 'ad oi'],
      tra: ['Dạ Dinh chào {ten} ạ 🌷 Rất vui vì mình ghé xem chương trình. Mình đang muốn tìm hiểu về giá, lộ trình học hay đang băn khoăn mình có làm được không ạ?',
            'Chào {ten} nha 👋 Dinh đây. Mình cứ hỏi thoải mái, chuyện gì về chương trình Đồng Hành 30 Ngày Dinh cũng giải đáp được ạ.'] },
    { id: 'gia', tu: ['gia', 'bao nhieu', 'hoc phi', 'chi phi', 'bao tien', 'nhieu tien', 'dat khong', 'dat qua'],
      tra: ['Dạ, chương trình có giá niêm yết 2.999.000đ, đợt này đăng ký chỉ còn <b>1.499.000đ</b> (tiết kiệm 50%) cho 30 học viên đầu tiên ạ.<br><br>Dinh nói thật lòng nhé: chỉ cần 1 video lên xu hướng mang về 2–3 đơn là mình đã hoà vốn rồi, mà hệ thống thì dùng được mãi. Lại còn được hoàn tiền 100% trong 7 ngày nếu không thấy hữu ích nữa ạ 😊'],
      nut: ['Gồm những gì?', 'Đăng ký ngay'] },
    { id: 'hoan_tien', tu: ['hoan tien', 'hoan lai', 'bao hanh', 'khong hai long', 'rui ro', 'lua dao', 'uy tin', 'tin duoc khong'],
      tra: ['Dinh hiểu mà, bỏ tiền ra học online ai cũng sợ "mua xong bị bỏ rơi" 🥲 Nên chương trình cam kết rõ: <b>hoàn tiền 100% trong 7 ngày</b>, không cần giải thích lý do. Mình cứ vào học buổi Zoom đầu, nhận tài liệu, dùng thử tool – thấy không hợp thì nhắn Zalo là được hoàn lại toàn bộ ạ. Rủi ro là của bên mình, không phải của {ten} đâu.'],
      nut: ['Học phí bao nhiêu?', 'Đăng ký ngay'] },
    { id: 'cong_nghe', tu: ['cong nghe', 'khong ranh', 'khong biet gi', 'nguoi moi', 'lon tuoi', 'co lam duoc', 'kho khong', 'de khong', 'may tinh', 'dien thoai', 'khong gioi'],
      tra: ['{ten} yên tâm nha, rất nhiều chủ shop vào học cũng nói y câu này đó ạ 😄 Toàn bộ hệ thống được làm để mình chỉ cần <b>gõ chữ và bấm nút</b>: kịch bản có skill viết sẵn, tool dựng video làm theo từng bước. Trong 5 buổi Zoom mình làm cùng nhau trên màn hình, kẹt chỗ nào được gỡ ngay chỗ đó.<br><br>Dinh hay nói vui: dùng được Zalo với Facebook là học được chương trình này ạ 💪'],
      nut: ['Lộ trình học thế nào?', 'Tôi bận lắm'] },
    { id: 'affiliate', uuTien: 2, tu: ['affiliate', 'aff', 'tiep thi lien ket', 'hoa hong', 'tiktok shop', 'shopee', 'lazada', 'gan gio', 'gio hang', 'koc', 'kol'],
      tra: ['Dạ có ạ, người làm <b>affiliate</b> là một trong những đối tượng hợp nhất với chương trình đó {ten} 💛 Làm affiliate thì cần <b>nhiều video mỗi ngày</b> để gắn giỏ hàng TikTok Shop, Shopee… mà quay thủ công thì không kịp.<br><br>Trong 30 ngày, mình sẽ học cách dùng AI <b>sản xuất video hàng loạt</b> cho từng sản phẩm, nắm <b>10 dạng video viral</b> và tư duy để làm bất kỳ dạng video nào, không cần lộ mặt. Mình đang làm affiliate trên nền tảng nào ạ?'],
      nut: ['Học phí bao nhiêu?', 'Lộ trình học thế nào?'] },
    { id: 'nganh', uuTien: 2, tu: ['nganh', 'linh vuc', 'bat dong san', 'my pham', 'spa', 'thoi trang', 'an uong', 'nha hang', 'bao hiem', 'tai chinh', 'giao duc', 'dich vu', 'phu hop', 'san pham cua toi', 'kinh doanh'],
      tra: ['Dạ, chương trình làm được cho rất nhiều ngành ạ: gia dụng, ẩm thực, bất động sản, mỹ phẩm, mẹ và bé, thú cưng, thương hiệu cá nhân, TVC quảng cáo… Ngành nghiêm túc như bất động sản, tài chính, giáo dục cũng có dạng video chuyên gia, video giải đáp riêng, vẫn chỉn chu mà vẫn lên view tốt.<br><br>Mà ngành càng "khó", đối thủ càng làm video kém, cơ hội nổi bật của mình càng lớn đó {ten} 😉 Mình đang kinh doanh ngành gì ạ? Dinh gợi ý dạng video hợp với mình nhé.'],
      zalo: true },
    { id: 'thoi_gian', tu: ['ban qua', 'ban lam', 'ban rong', 'ban viec', 'thoi gian', 'khong co time', 'quay', 'lo mat', 'ngai', 'so len hinh', 'khong dam', 'xem lai', 'ghi hinh', 'ban ghi'],
      tra: ['Chính vì {ten} bận nên mới cần hệ thống này đó ạ 🙌 Mình <b>không cần quay, không cần lộ mặt</b>: AI lo hình ảnh, giọng đọc và dựng video. Mỗi tuần chỉ cần khoảng 60 phút để sản xuất video cho cả tuần, đăng bài thì đã có quy trình tự động. Các buổi Zoom đều có bản ghi để xem lại nếu mình lỡ buổi nào ạ.'],
      nut: ['Lộ trình học thế nào?', 'Học phí bao nhiêu?'] },
    { id: 'lo_trinh', tu: ['lo trinh', 'zoom', 'buoi', 'hoc gi', 'noi dung', 'chuong trinh', 'gom nhung gi', 'gom gi', 'nhan duoc gi', 'hoc nhu the nao', 'hinh thuc'],
      tra: ['Dạ, chương trình đồng hành 30 ngày với <b>5 buổi Zoom trực tiếp</b>:<br>1️⃣ Cài công cụ & làm video đầu tiên cho sản phẩm của bạn<br>2️⃣ Tặng 10 skill video AI viral & hướng dẫn từng bước cách làm các dạng video<br>3️⃣ Tạo skill, dùng skill & nâng cấp skill theo nhu cầu của từng người<br>4️⃣ Sản xuất video tự động & đăng bài đa nền tảng<br>5️⃣ Tổng kết, chữa bài từng người & hỏi đáp 1-1<br><br>Xuyên suốt 30 ngày có <b>bài tập mỗi ngày</b> và <b>chữa bài cho từng người</b> ạ ✨'],
      nut: ['Quà tặng là gì?', 'Học phí bao nhiêu?'] },
    { id: 'qua', tu: ['qua tang', 'nhan qua', 'qua gi', 'tang kem', 'tang gi', 'tool', 'skill', 'prompt', 'cong cu', 'phan mem', 'app'],
      tra: ['Dạ, đăng ký chương trình bạn được tặng 3 món ạ 🎁<br>• <b>Tool đa ngành review bán hàng</b> (trị giá 699.000đ)<br>• <b>Tool 1 ảnh xây kênh đa nền tảng</b> (trị giá 699.000đ)<br>• <b>10 skill video AI viral</b> (trị giá 990.000đ), kèm hướng dẫn nâng cấp thành skill của riêng bạn.<br><br>Cả 2 tool đều được hướng dẫn cài đặt và sử dụng ngay trong buổi Zoom ạ.'],
      zalo: true },
    { id: 'ket_qua', tu: ['hieu qua', 'ket qua', 'thanh cong', 'trieu view', 'len xu huong', 'dam bao', 'chac chan', 'bang chung', 'that khong'],
      tra: ['Câu hỏi rất đáng hỏi ạ 👍 Dinh đã tự kiểm chứng trên chính mình: mở <b>2 kênh mới tinh</b>, không quảng cáo, không người theo dõi, chỉ sau <b>5 ngày</b> đã vượt <b>2,2 triệu lượt xem</b> – có video đạt 1,3 triệu view. Ảnh chụp màn hình thật có ngay trên trang này đó ạ.<br><br>Dinh không dám hứa video nào cũng triệu view, vì còn tuỳ mình có làm bài đều không. Nhưng mình làm đúng hệ thống và có người sửa bài 1:1 thì cơ hội rất lớn ạ 💛'],
      nut: ['Có hoàn tiền không?', 'Đăng ký ngay'] },
    { id: 'lich', tu: ['khi nao', 'bat dau', 'khai giang', 'lich hoc', 'ngay nao', 'con suat', 'con cho', 'het han', 'may gio'],
      tra: ['Dạ, đợt này chỉ nhận <b>30 học viên</b> để đảm bảo sửa bài 1:1 cho từng người, giá ưu đãi 1.499.000đ chỉ áp dụng cho 30 học viên đầu tiên của đợt này thôi ạ. Sau khi mình đăng ký và chuyển khoản, bên mình thêm mình vào nhóm học riêng, lịch Zoom cụ thể được gửi trong nhóm ạ.'],
      nut: ['Đăng ký ngay', 'Vào nhóm Zalo'] },
    { id: 'thanh_toan', tu: ['thanh toan', 'chuyen khoan', 'dang ky', 'mua', 'qr', 'so tai khoan', 'stk', 'tham gia', 'giu suat', 'chot'],
      tra: ['Tuyệt vời quá {ten} ơi 🎉 Mình chỉ cần kéo xuống phần <b>Đăng ký giữ suất</b>, điền họ tên và số Zalo. Trang sẽ hiện ngay mã QR đúng số tiền, mình quét bằng app ngân hàng là xong. Chuyển khoản xong gửi ảnh qua Zalo để bên mình xếp lịch học nhé ạ.'],
      nut: ['Mở form đăng ký'] },
    { id: 'zalo', tu: ['zalo', 'nhom', 'lien he', 'so dien thoai', 'sdt', 'hotline', 'goi dien', 'tu van truc tiep'],
      tra: ['Dạ, mình vào nhóm Zalo riêng để nhận quà tặng và được tư vấn trực tiếp nhé {ten} 💬 Trong nhóm còn có tài liệu, video mẫu và giải đáp thường xuyên. Hoặc mình gọi/nhắn Zalo <b>0915 244 329</b> cũng được ạ.'],
      zalo: true },
    { id: 'cam_on', tu: ['cam on', 'thanks', 'thank', 'ok', 'oke', 'duoc roi', 'hieu roi', 'tuyet'],
      tra: ['Dạ không có gì đâu {ten} ơi 🥰 Mình còn băn khoăn gì cứ hỏi Dinh nhé. Nếu muốn nhận quà và xem thêm video mẫu thì vào nhóm Zalo riêng ạ.'],
      zalo: true },
  ];
  const TRA_LOI_KHAC = [
    'Câu này Dinh muốn tư vấn trực tiếp cho {ten} mới kỹ được ạ 💛 Mình để lại <b>số Zalo</b> ngay trong khung chat này, Dinh sẽ nhắn riêng cho mình nhé. Hoặc vào nhóm Zalo để nhận quà và hỏi thoải mái ạ.',
    'Câu này hay quá, Dinh muốn trả lời {ten} thật kỹ nên mời mình vào nhóm Zalo riêng để trao đổi trực tiếp nhé 💛 Trong nhóm còn có quà tặng và nhiều thông tin về khoá học nữa ạ.',
    'Dạ Dinh ghi nhận câu hỏi của {ten} rồi ạ. Để được giải đáp cặn kẽ và đúng với trường hợp của mình nhất, mình vào nhóm Zalo riêng nhé – vừa có người tư vấn trực tiếp, vừa nhận được quà tặng ạ 🎁',
  ];
  const NUT_MAC_DINH = ['Học phí bao nhiêu?', 'Tôi không rành công nghệ', 'Lộ trình học thế nào?', 'Quà tặng là gì?'];
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
  #tl-nut{position:fixed;right:16px;bottom:20px;z-index:60;width:62px;height:62px;border-radius:50%;border:2px solid #F5B83D;padding:0;cursor:pointer;background:#0B1224;box-shadow:0 10px 30px -6px rgba(255,90,31,.6)}
  #tl-nut img{width:100%;height:100%;border-radius:50%;object-fit:cover}
  #tl-nut .tl-cham{position:absolute;top:2px;right:2px;width:14px;height:14px;border-radius:50%;background:#22c55e;border:2px solid #0B1224}
  #tl-moi{position:fixed;right:16px;bottom:92px;z-index:60;max-width:250px;background:#fff;color:#111;border-radius:16px 16px 4px 16px;padding:10px 14px;font-size:14px;line-height:1.4;box-shadow:0 10px 30px rgba(0,0,0,.35);cursor:pointer;display:none}
  #tl-khung{position:fixed;right:16px;bottom:20px;z-index:70;width:370px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100vh - 100px);display:none;flex-direction:column;background:#0B1224;border:1px solid #1E2A4A;border-radius:22px;overflow:hidden;box-shadow:0 30px 80px -10px rgba(0,0,0,.7);font-family:inherit;color:#E8ECF6}
  #tl-khung.mo{display:flex}
  .tl-dau{display:flex;align-items:center;gap:10px;padding:12px 14px;background:linear-gradient(90deg,#FF5A1F,#FF8A3D 50%,#F5B83D);color:#070B16}
  .tl-dau img{width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid #fff}
  .tl-dau b{display:block;font-size:15px}.tl-dau small{font-size:12px;font-weight:600;opacity:.85}
  .tl-dong{margin-left:auto;background:rgba(7,11,22,.15);border:0;width:32px;height:32px;border-radius:50%;font-size:18px;cursor:pointer;color:#070B16}
  .tl-than{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}
  .tl-tin{max-width:85%;padding:10px 13px;border-radius:16px;font-size:14px;line-height:1.5;word-wrap:break-word}
  .tl-tin.bot{background:#111A33;border:1px solid #1E2A4A;border-bottom-left-radius:4px;align-self:flex-start}
  .tl-tin.khach{background:linear-gradient(90deg,#FF8A3D,#F5B83D);color:#070B16;font-weight:500;border-bottom-right-radius:4px;align-self:flex-end}
  .tl-tin b{color:#FFD978}.tl-tin.khach b{color:inherit}
  .tl-go{display:flex;gap:4px;padding:12px 14px}.tl-go i{width:7px;height:7px;border-radius:50%;background:#94a3b8;animation:tlb 1s infinite}.tl-go i:nth-child(2){animation-delay:.15s}.tl-go i:nth-child(3){animation-delay:.3s}
  @keyframes tlb{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-5px);opacity:1}}
  .tl-zalo{display:flex;align-items:center;justify-content:center;gap:8px;align-self:flex-start;max-width:85%;padding:10px 14px;border-radius:14px;background:#0068FF;color:#fff !important;font-weight:800;font-size:14px;text-decoration:none}
  .tl-chip{display:flex;flex-wrap:wrap;gap:6px}
  .tl-chip button{background:transparent;border:1px solid #F5B83D;color:#FFD978;border-radius:999px;padding:6px 11px;font-size:13px;cursor:pointer;font-family:inherit}
  .tl-chip button:hover{background:rgba(245,184,61,.15)}
  .tl-nhap{display:flex;gap:8px;padding:10px;border-top:1px solid #1E2A4A;background:#070B16}
  .tl-nhap input{flex:1;min-width:0;background:#111A33;border:1px solid #1E2A4A;border-radius:12px;padding:11px 12px;color:#fff;font-size:15px;font-family:inherit;outline:none}
  .tl-nhap input:focus{border-color:#F5B83D}
  .tl-nhap button{border:0;border-radius:12px;padding:0 16px;font-weight:900;cursor:pointer;background:linear-gradient(90deg,#FF5A1F,#F5B83D);color:#070B16}
  .tl-chan{font-size:11px;text-align:center;color:#64748b;padding:0 0 8px;background:#070B16}
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
      <div class="tl-chan">Muốn nhắn trực tiếp với Dinh? Zalo 0915 244 329</div>
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
    tl = sdt ? { text: goi(`Dạ Dinh đã lưu số <b>${sdt}</b> rồi ạ 💛 Dinh sẽ nhắn riêng tư vấn cho {ten} sớm nhất. Trong lúc chờ, mình vào nhóm Zalo để nhận quà trước nhé!`), zalo: true, nut: [] } : traLoiKichBan(raw);
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
      themTin(`Dạ, Dinh chào bạn 🌷 Đây là khung tư vấn tự động 24/7 của <b>Phạm Dinh AI</b>.<br><br>Bạn đang tìm hiểu chương trình <b>Đồng Hành 30 Ngày – Làm Video Bán Hàng Bằng AI</b> phải không ạ? Bạn có băn khoăn gì, cứ hỏi Dinh thoải mái nhé 😊`, 'bot');
      lichSu.push({ role: 'model', text: 'Chào bạn, Dinh đây (tư vấn tự động 24/7 của Phạm Dinh AI). Bạn có băn khoăn gì cứ hỏi nhé.' });
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
    moi.innerHTML = '👋 Chào bạn! Dinh có thể giúp gì cho bạn về chương trình 30 ngày không ạ?';
    moi.style.display = 'block';
  }, TRO_LY.chaoSau * 1000);
})();
