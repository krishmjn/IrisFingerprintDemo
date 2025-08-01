import dayjs from "dayjs";

export class FingerPrint {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.gender = data.gender === 1 ? "Male" : "Female";
    // this.dob = dayjs(data.dob).format("YYYY-MM-DD");
    this.dob = dayjs(data.dob);
    this.fingerName = data.fingerName;
    this.exceptionCaseRemarks = data.exceptionCaseRemarks;
  }
  static mapData(data) {
    return data.map((item) => {
      return new FingerPrint(item);
    });
  }
}
