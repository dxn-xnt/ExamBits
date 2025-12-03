import API from './API'
import ExamController from './ExamController'
import QuestionController from './QuestionController'
import PublishController from './PublishController'
const Controllers = {
    API: Object.assign(API, API),
ExamController: Object.assign(ExamController, ExamController),
QuestionController: Object.assign(QuestionController, QuestionController),
PublishController: Object.assign(PublishController, PublishController),
}

export default Controllers