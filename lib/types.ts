export type User = {
    id: string;
    email: string;
    full_name: string | null;
    role: 'student' | 'admin';
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
  };
  
  export type Course = {
    id: string;
    title: string;
    description: string | null;
    cover_image: string | null;
    is_published: boolean;
    created_by: string;
    created_at: string;
    updated_at: string;
  };
  
  export type Module = {
    id: string;
    course_id: string;
    title: string;
    description: string | null;
    position: number;
    created_at: string;
    updated_at: string;
  };
  
  export type Material = {
    id: string;
    module_id: string;
    title: string;
    content_type: 'text' | 'video' | 'pdf' | 'link';
    content: string | null;
    file_url: string | null;
    position: number;
    created_at: string;
    updated_at: string;
  };
  
  export type ModuleQuiz = {
    id: string;
    module_id: string;
    title: string;
    description: string | null;
    passing_score: number;
    time_limit_minutes: number | null;
    created_at: string;
    updated_at: string;
  };
  
  export type FinalExam = {
    id: string;
    course_id: string;
    title: string;
    description: string | null;
    passing_score: number;
    time_limit_minutes: number | null;
    created_at: string;
    updated_at: string;
  };
  
  export type Question = {
    id: string;
    quiz_id: string | null;
    exam_id: string | null;
    question_text: string;
    question_type: 'multiple_choice' | 'true_false' | 'text';
    points: number;
    position: number;
    created_at: string;
    options?: QuestionOption[];
  };
  
  export type QuestionOption = {
    id: string;
    question_id: string;
    option_text: string;
    is_correct: boolean;
    position: number;
  };
  
  export type Enrollment = {
    id: string;
    user_id: string;
    course_id: string;
    enrolled_at: string;
    completed_at: string | null;
  };
  
  export type UserProgress = {
    id: string;
    user_id: string;
    material_id: string;
    completed: boolean;
    last_accessed_at: string;
    completed_at: string | null;
  };
  
  export type QuizAttempt = {
    id: string;
    user_id: string;
    quiz_id: string | null;
    exam_id: string | null;
    score: number | null;
    percentage: number | null;
    passed: boolean | null;
    started_at: string;
    completed_at: string | null;
  };