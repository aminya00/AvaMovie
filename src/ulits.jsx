import jalaali from "jalaali-js";

const numbers = [
  { en: "0", fa: "۰" },
  { en: "1", fa: "۱" },
  { en: "2", fa: "۲" },
  { en: "3", fa: "۳" },
  { en: "4", fa: "۴" },
  { en: "5", fa: "۵" },
  { en: "6", fa: "۶" },
  { en: "7", fa: "۷" },
  { en: "8", fa: "۸" },
  { en: "9", fa: "۹" },
];

export const EnToFaNums = (number) => {
  let findNumber = null;

  let faNumsArr = String(number)
    .trim()
    .split("")
    .map((num) => {
      let someRturn = numbers.some((num2) => {
        if (num == num2.en) {
          findNumber = num2.fa;
          return true;
        }
      });

      return someRturn ? findNumber : num;
    });
  return faNumsArr.join("");
};
export const miladiTojalaali = (miladiDate) => {
  let jalaaliEndTime = jalaali.toJalaali(miladiDate);

  return `${EnToFaNums(jalaaliEndTime.jy)}/${EnToFaNums(
    jalaaliEndTime.jm
  )}/${EnToFaNums(jalaaliEndTime.jd)}`;
};
