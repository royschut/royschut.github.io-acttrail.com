export default function getFormData(obj) {
  if (!obj.type || !obj.obj || !obj.props) {
    console.log("getFormData: Input incomplete!");
    return {};
  }
  let fd = [];
  obj.props.forEach((key) => {
    let o = {};
    o.key = key;
    o.value = obj.obj[key];
    o.label = getLabelFor(key);
    o.validationProps = getValidationPropsFor(key);
    fd.push(o);
  });

  return fd;
}
function getLabelFor(key) {
  switch (key) {
    case "firstname":
      return "First name";
    case "lastname":
      return "Last name";
    case "fullname":
      return "Full name";
    case "email":
      return "E-mail";
    case "timetable":
      return "Timetable";
    case "media":
      return "media";
    case "name":
      return "Name";
    case "subname":
      return "Sub name";
    case "date":
      return "Date";
    case "address":
      return "Address";
    case "zipcode":
      return "Zip code";
    case "notes":
      return "Notes";
    case "bookingstatus_id":
      return "Status";
    case "day":
      return "Day";
    case "fee":
      return "Fee";
    case "area":
      return "Area";
    case "settype":
      return "Set type";
    case "briefing":
      return "Briefing:";
    case "standardfee":
      return "Standard fee";
    case "bottomfee":
      return "Bottom fee";
  }
}
function getValidationPropsFor(key) {
  switch (key) {
    case "firstname":
      return { type: "string", length: 25 };
    case "lastname":
      return { type: "string", length: 25 };
    case "fullname":
      return { type: "string", length: 45 };
    case "email":
      return { type: "string", length: 25 };
    case "timetable":
      return { type: "string", length: 255, multiline: true };
    case "media":
      return { type: "string", length: 25 };
    case "name":
      return { type: "string", length: 45 };
    case "subname":
      return { type: "string", length: 90 };
    case "date":
      return { type: "date" };
    case "address":
      return { type: "string", length: 25, multiline: true };
    case "zipcode":
      return { type: "string", length: 10 };
    case "notes":
      return { type: "string", length: 90, multiline: true };
    case "bookingstatus_id":
      return {
        type: "number",
        length: 10,
        options: [
          { label: "Option", id: 1 },
          { label: "Confirmed", id: 2 },
          { label: "Canceled", id: 3 },
          { label: "Archived", id: 4 },
        ],
      };
    case "day":
      return { type: "number", length: 3 };
    case "fee":
      return { type: "money", length: 8 };
    case "area":
      return { type: "string", length: 25 };
    case "settype":
      return { type: "string", length: 15 };
    case "briefing":
      return { type: "string", length: 255, multiline: true };
    default:
      console.log("FormData, key missing!", key);
      break;
    case "standardfee":
      return { type: "money", length: 8 };
    case "bottomfee":
      return { type: "money", length: 8 };
  }
}
