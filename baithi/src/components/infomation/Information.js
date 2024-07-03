import "./Information.scss";
import { AiOutlineCheckCircle } from "react-icons/ai";
function Information() {
  const data = [
    {
      id: 1,
      titile: "TẠO BÀI THI TRẮC NGHIỆM ONLINE MIỄN PHÍ VÀ DỄ SỬ DỤNG",
      img: "https://ninequiz.com/static/media/feature4-min.a6bb601c.png",
      option: [
        "Dễ dàng tạo hoặc upload file câu hỏi trắc nghiệm",
        "Nhiều tùy chọn trộn câu hỏi và tự động chấm bài làm",
        "Tạo bài thi lấy ngẫu nhiên từ ngân hàng câu hỏ.i trắc nghiệm của bạn",
        "Tích hợp Chat GPT giúp bạn tự động tạo câu hỏi trắc nghiệm",
        "Triển khai thi online hoặc làm bài thi online không cần cài đặt ứng dụng",
      ],
    },
    {
      id: 2,
      titile:
        "Thêm câu hỏi trắc nghiệm và tạo bài thi đơn giản hơn bao giờ hết",
      img: "https://ninequiz.com/static/media/tao_cau_hoi_trac_nghiem_bang_AI.cd42d636.webp",
      option: [
        "Thêm câu hỏi trắc nghiệm bằng tay với nhiều dạng câu hỏi như: câu hỏi lựa chọn một đáp án, câu hỏi lựa chọn nhiều đáp án, câu hỏi upload file...",
        "Thêm câu hỏi từ Ngân Hàng câu hỏi trắc nghiệm, bạn có thể lấy câu hỏi chỉ định từ ngân hàng câu hỏi hoặc cài đặt bài thi online lấy số lượng câu hỏi ngẫu nhiên từ thư viện câu hỏi cho mỗi bài làm khác nhau.",
        "Tải file danh sách câu hỏi trắc nghiệm có sẵn lên, Ninequiz hỗ trợ các file word, excel, pdf.",
        "Sử dụng AI tạo câu hỏi theo chủ đề của bạn, ví dụ: “tạo câu hỏi trắc nghiệm hoá học lớp 12”.",
        "Tạo câu hỏi từ nội dung của bạn bằng AI, sau khi bạn cung cấp nội dung cho AI, hệ thống sẽ tự động tạo câu hỏi trắc nghiệm từ nội dung tài liệu của bạn.",
      ],
    },
  ];
  return (
    <div className="information">
      <div className="infor-container">
        {data.map((item, index) => (
          <div
            key={index}
            className={`infor-acc ${item.id % 2 == 1 ? "right" : ""}`}
          >
            <div className="infor-img">
              <img className="infor-img-item" src={item.img} alt=""></img>
            </div>
            <div className="infor-body">
              <div className="infor-header">
                <h2 className="infor-header-title">{item.titile}</h2>
              </div>
              <div className="infor-content">
                {item.option.map((opt, index) => (
                  <ul key={index} className="infor-list">
                    <li className="infor-item">
                      <AiOutlineCheckCircle className="infor-icon"></AiOutlineCheckCircle>
                      {opt}
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Information;
