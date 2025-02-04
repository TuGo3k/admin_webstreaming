import React from "react"
import MainContainer from "../../Utills/MainContainer";
import CourseTable from "../../components/course/CourseTable"
import CourseModal from "../../components/course/CourseModal";



const CoursePage= () => {
    return(
        <MainContainer>
            <CourseModal/>
          <CourseTable />
        </MainContainer>
    )
}
export default CoursePage;