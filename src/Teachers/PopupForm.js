import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import Popup from "reactjs-popup";
import SelectCities from "./selectCities";
import { InviteTeachers } from '../GraphQl/Mutations';
import "./popup.css";

function PopupForm() {
  const [firstSelection, setFirstSelection] = useState("");
  const [secondSelectionDisabled, setSecondSelectionDisabled] = useState(true);
  const [schoolId, setSchoolId] = useState("school");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [email, setEmail] = useState("");

  const [inviteTeacher, { data, loading, error }] = useMutation(InviteTeachers);

  const handleFirstSelect = (event) => {
    const value = parseInt(event.target.value, 10);
    setFirstSelection(value);
    setSecondSelectionDisabled(false);
  };

  useEffect(() => {
    switch (firstSelection) {
      case 1:
        setSchoolId("school");
        break;
      case 2:
        setSchoolId("middle");
        break;
      case 3:
        setSchoolId("high");
        break;
      default:
        setSchoolId("school");
        break;
    }
  }, [firstSelection]);

  const handleSelectedSubjectsChange = (selectedSubjects) => {
    setSelectedSubjects(selectedSubjects);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    const subjects = selectedSubjects.map(subject => subject.value);
    try {
      const { data } = await inviteTeacher({
        variables: {
          email: email,
          subjects: subjects,
        },
      });
      if (data.inviteTeacher.succeeded) {
        console.log("Teacher invited successfully");
      } else {
        console.error("Failed to invite teacher");
      }
    } catch (error) {
      console.error("Error inviting teacher:", error);
    }
  };

  return (
    <Popup
      className="popup"
      trigger={<button style={{ position: "relative" }}>اضافة أستاد +</button>}
      modal
      nested
    >
      {(close) => (
        <div className="modal">
        <div>
        <h2>طلب الانظمام من أستاد</h2>
              <div>
                <select onChange={handleFirstSelect} name={"phase"}>
                  <option selected disabled value="">
                    اختر الطور
                  </option>
                  <option value="1">الابتدائي</option>
                  <option value="2">المتوسط</option>
                  <option value="3">الثانوي</option>
                </select>
              </div>
              <div className="modal-item">
                <SelectCities
                  secondSelectionDisabled={secondSelectionDisabled}
                  schoolId={schoolId}
                  onSelectedSubjectsChange={handleSelectedSubjectsChange}
                />
              </div>
              <div>
                <div>
                  <label htmlFor="email">البريد الالكتروني</label>
                </div>
                <input
                  placeholder="chouaibe@gmail.com"
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="buttonDiv">
              <button
              
                  onClick={async () => {
                    await handleSubmit();
                    close();
                  }}
                >
                  ارسال
                </button>


                <button
                
                  onClick={() => close()}
                >
                  الغاء
                </button>
           
              </div>
        </div>
          </div>
      )}
    </Popup>
  );
}

export default PopupForm;
