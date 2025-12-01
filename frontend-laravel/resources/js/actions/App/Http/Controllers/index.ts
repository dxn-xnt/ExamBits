import API from './API'
import ExamController from './ExamController'
import QuestionController from './QuestionController'


const Controllers = {
    API: Object.assign(API, API),
    ExamController: Object.assign(ExamController, ExamController),
    QuestionController: Object.assign(QuestionController, QuestionController),
}

export default Controllers