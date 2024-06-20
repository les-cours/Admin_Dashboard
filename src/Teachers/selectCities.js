import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LoadSubjects } from "../GraphQl/Queries";
import Select from "react-select";


export default function SelectCities({ secondSelectionDisabled, schoolId ,onSelectedSubjectsChange}) {

  console.log(schoolId);
  const { error, loading, data } = useQuery(LoadSubjects, {
    variables: { schoolID: schoolId },
  });
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
    if (data && data.school) {
      const groupedSubjects = data.school.flatMap((school) =>
        school.grades.map((grade) => ({
          label: grade.arabicTitle, 
          options: grade.subjects.map((subject) => ({
            value: subject.subjectID,
            label: subject.arabicTitle,
          })),
        }))
      );
      setSubjects(groupedSubjects);
    }
  }, [data]);


  const handleChange = (selectedOptions) => {
    
    setSelectedSubjects(selectedOptions);
    onSelectedSubjectsChange(selectedOptions);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(selectedSubjects);
  return (
    <div>
      <Select
        placeholder={<div>اختر المادة</div>}
        isSearchable={true}
        options={subjects}
        isDisabled={secondSelectionDisabled}
        value={selectedSubjects}
        onChange={handleChange}
        isMulti={true}
        styles={{
          container: (provided) => ({
            ...provided,
            maxWidth: '250px', 
          }),
        }}
      />
    </div>
  );
}
