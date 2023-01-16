import { useState } from "react";
import EmailItem from "../EmailItem";
import styles from "./EmailList.module.scss";

const menuArr = [
  {
    id: 1,
    Name: "Lehuuquan",
    Title: "Bạn có hài lòng với công việc hiện tại không?",
    Content: `Tham gia khảo sát, có ngay cơ hội nhận phần quà là tiền mặt 200K Bạn
    thân mến, JobsGO xin cảm ơn bạn đã đồng hành cùng JobsGO trong suốt
    thời gian vừa qua. Là một đơn vị uy tín trong lĩnh vực tuyển`,
    Time: "09:12",
  },
  {
    id: 2,
    Name: "DuongManhQuynh",
    Title: "Let Her Go Lyric",
    Content: `Well, you only need the light when it's burning low
    Only miss the sun when it starts to snow
    Only know you love her when you let her go
    Only know you've been high when you're feeling low
    Only hate the road when you're missing home
    Only know you love her when you let her go
    `,
    Time: "09:45",
  },
  {
    id: 3,
    Name: "VOCA",
    Title: "Lời dịch bài hát Let Her Go",
    Content: `Lời dịch sẽ giúp bạn hiểu được ý nghĩa bài hát Let Her Go của ca sĩ Passenger một cách đầy đủ, rõ ràng nhất.`,
    Time: "09:12",
  },
  {
    id: 4,
    Name: "Đen(rapper)",
    Title: "Bài này viết về nhạc sĩ, rapper",
    Content: `Nguyễn Đức Cường (sinh ngày 13 tháng 5 năm 1989 tại Quảng Ninh), thường được biết đến với nghệ danh Đen Vâu hay Đen, là một nam rapper và nhạc sĩ người Việt Nam.`,
    Time: "12/1/2023",
  },
  {
    id: 5,
    Name: "QuyenQuyen",
    Title: "Những bài văn điểm 10 chấn động mạng",
    Content: `Những bài văn viết về người thầy cũ đã nghỉ hưu, người bố làm nghề xe ôm hay người mẹ đơn thân thần tảo nuôi con… đã lấy được nước mắt của người đọc.`,
    Time: "26/10/2014",
  },
  {
    id: 6,
    Name: "Lehuuquan",
    Title: "Bạn có hài lòng với công việc hiện tại không?",
    Content: `Tham gia khảo sát, có ngay cơ hội nhận phần quà là tiền mặt 200K Bạn
    thân mến, JobsGO xin cảm ơn bạn đã đồng hành cùng JobsGO trong suốt
    thời gian vừa qua. Là một đơn vị uy tín trong lĩnh vực tuyển`,
    Time: "09:12",
  },
];

function EmailList() {
  const [check, setCheck] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkAll, setCheckAll] = useState(false);

  const handleCheckAll = () => {
    if (menuArr.length === checkedItems.length) {
      setCheckedItems([]);
      return;
    }
    setCheckedItems(menuArr.map((item) => item.id));
  };
  return (
    <>
      <div className={styles.topbar}>
        <div>
          <input
            type="checkbox"
            checked={checkedItems.length === menuArr.length}
            onChange={handleCheckAll}
          />
        </div>
        <div>
          <span>1-50 of 155</span>
        </div>
      </div>
      {menuArr.map((item) => {
        return (
          <EmailItem
            item={item}
            key={item.id}
            checked={checkedItems.includes(item.id)}
            onCheck={() => {
              if (checkedItems.includes(item.id)) {
                setCheckedItems(checkedItems.filter((id) => id !== item.id));
              } else {
                setCheckedItems([...checkedItems, item.id]);
              }
            }}
          />
        );
      })}
    </>
  );
}

export default EmailList;
