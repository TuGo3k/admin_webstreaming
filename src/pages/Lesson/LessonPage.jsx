import React from "react"
import MainContainer from "../../Utills/MainContainer";
import LessonTable from "../../components/Lesson/LessonTable";
import LessonModal from "../../components/Lesson/LessonModal";





const LessonPage = () => {
    return(
        <MainContainer>
            <LessonModal />
            <LessonTable />
        </MainContainer>
    )
}
export default LessonPage;