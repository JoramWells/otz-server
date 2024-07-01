export interface ArticleAttributes {
  id: string;
  userID: string;
  chapterID: string;
  image: string;
  content: string;
  title: string;
  video: string;
  viewers: number;
}

export interface ArticleProgressAttributes {
  id: string;
  articleID: string;
  chapterProgressID: string;
  startTime: string;
  timeSpentOnArticle: number;
}


export interface BookAttributes {
  id: string;
  description: string;
  thumbnail: string;
}

export interface ChapterProgressAttributes {
  id: string;
  courseID: string;
  chapterID: string;
  startDate: string;
  endDate: string;
  isComplete: boolean;
}

export interface ChapterAttributes {
  id: string;
  description: string;
  bookID: string;
  thumbnail: string;
}

export interface CoursesAttributes {
  id: string;
  patientID: string;
  bookID: string;
}


export interface QuestionAttributes {
  id: string;
  question: string;
  choices: string;
  answer: string;
  articleID: string;
}