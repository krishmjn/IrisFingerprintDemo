export const fingers = [
  { label: "Right Thumb", value: "right_thumb" },
  { label: "Right Index", value: "right_index" },
  { label: "Right Middle", value: "right_middle" },
  { label: "Right Ring", value: "right_ring" },
  { label: "Right Little", value: "right_little" },
  { label: "Left Thumb", value: "left_thumb" },
  { label: "Left Index", value: "left_index" },
  { label: "Left Middle", value: "left_middle" },
  { label: "Left Ring", value: "left_ring" },
  { label: "Left Little", value: "left_little" },
  { label: "Unknown", value: "Unknown" },
];

export const options = [
  { value: "ten", label: "Ten print" },
  { value: "chance", label: "Chance print" },
];

export const fingersLayoutList = [
  { label: "1", value: "Right Thumb", key: "right_thumb" },
  { label: "2", value: "Right Index", key: "right_index" },
  { label: "3", value: "Right Middle", key: "right_middle" },
  { label: "4", value: "Right Ring", key: "right_ring" },
  { label: "5", value: "Right Little", key: "right_little" },
  { label: "6", value: "Left Thumb", key: "left_thumb" },
  { label: "7", value: "Left Index", key: "left_index" },
  { label: "8", value: "Left Middle", key: "left_middle" },
  { label: "9", value: "Left Ring", key: "left_ring" },
  { label: "10", value: "Left Little", key: "left_little" },
];

export const getMarginLeft = (name) => {
  if (name === "Left Thumb") {
    return "-10px";
  } else if (name === "Left Little") {
    return "13px";
  } else if (name === "Right Thumb") {
    return "16px";
  } else if (name === "Right Little") {
    return "1px";
  } else {
    return "6px";
  }
};

export const fingerprintExceptions = [
  { label: "Scar", value: "scar" },
  { label: "Burn", value: "burn" },
  { label: "Wart", value: "wart" },
  { label: "Cut", value: "cut" },
  { label: "Missing Finger", value: "missing_finger" },
  { label: "Skin Disease", value: "skin_disease" },
  { label: "Other", value: "other" },
];

export const getFilteredList = (data) => {
  const imageList = [];
  const exceptionList = [];
  data.forEach((item) => {
    if (item.filePath) {
      imageList.push(item);
    }
    if (item.exceptionCaseRemarks) {
      exceptionList.push(item);
    }
  });
  return { imageList, exceptionList };
};

export const columns = [
  {
    title: "Finger Name",
    dataIndex: "fingerName",
    key: "fingerName",
  },
  {
    title: "Image",
    dataIndex: "filePath",
    key: "filePath",
    render: (filePath) =>
      filePath ? (
        <img
          src={filePath}
          alt="finger"
          style={{ width: "60px", height: "60px", objectFit: "cover" }}
        />
      ) : (
        "-"
      ),
  },
];

export const exceptionColumns = [
  {
    title: "Finger Name",
    dataIndex: "fingerName",
    key: "fingerName",
  },
  {
    title: "exception",
    dataIndex: "exceptionCaseRemarks",
    key: "exceptionCaseRemarks",
  },
];

export const fingerTypeOptions = [
  { label: "Arch", value: "Arch" },
  { label: "Loop", value: "Loop" },
  { label: "Whorl", value: "Whorl" },
];

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file); // Converts to base64
  });
};

// Usage example in a file input handler
export const handleFileChange = async (e) => {
  const file = e.file.originFileObj;
  if (file) {
    const base64 = await fileToBase64(file);
    console.log("Base64 string:", base64);
    // send base64 to backend here
  }
};

// const base64 =
//   "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9oNzkAAAAABJRU5ErkJggg==";
// const src = `data:image/png;base64,${base64}`;

export const fingerNameConverter = (name) => {
  switch (name) {
    case "right_thumb":
      return "Right Thumb";
    case "right_index":
      return "Right Index";
    case "right_middle":
      return "Right Middle";
    case "right_ring":
      return "Right Ring";
    case "right_little":
      return "Right Little";
    case "left_thumb":
      return "Left Thumb";
    case "left_index":
      return "Left Index";
    case "left_middle":
      return "Left Middle";
    case "left_ring":
      return "Left Ring";
    case "left_little":
      return "Left Little";
    default:
      return name;
  }
};
