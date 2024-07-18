export interface ArticleAttributes {
  id: string;
  userID: string;
  chapterID: string;
  image: string;
  content: string;
  title: string;
  video: string;
  viewers: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ArticleProgressAttributes {
  id: string;
  articleID: string;
  chapterProgressID: string;
  startTime: string;
  timeSpentOnArticle: number;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface BookAttributes {
  id: string;
  description: string;
  thumbnail: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ChapterProgressAttributes {
  id: string;
  courseID: string;
  chapterID: string;
  startDate: string;
  endDate: string;
  isComplete: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ChapterAttributes {
  id: string;
  description: string;
  bookID: string;
  thumbnail: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CoursesAttributes {
  id: string;
  patientID: string;
  bookID: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface QuestionAttributes {
  id: string;
  question: string;
  choices: string;
  answer: string;
  articleID: string;
  createdAt?: Date;
  updatedAt?: Date;
}

