import { useState } from "react";
import { Formik, Form } from "formik";
import { Select, Input } from "components";
import { useGlobalProvider } from "hooks";
import {
  QuestionAndAnswers,
  TriviaApiResponse,
  View,
  CreateQuizFormValues,
} from "types";
import { createTriviaApiUrl, shuffleArray } from "helpers";

const initialValues: CreateQuizFormValues = {
  category: "9",
  amount: 10,
  difficulty: "",
  type: "",
};

export const CreateQuiz = () => {
  const { onSetResults, onSetShowLoader, onSetView } = useGlobalProvider();
  const [error, setError] = useState("");

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          const url = createTriviaApiUrl(values);

          try {
            onSetShowLoader(true);
            const res = await fetch(url);
            const data: TriviaApiResponse = await res.json();
            if (data.response_code === 1) {
              setError("Not enough results. Please try again.");
              return;
            }
            // save results to global provider to use questions/answers in quiz
            const results: QuestionAndAnswers[] = [];
            for (let i = 0; i < data.results.length; i++) {
              const result = data.results[i];
              results.push({
                question: result.question,
                correct_answer: result.correct_answer,
                answers: shuffleArray([...result.incorrect_answers, result.correct_answer]),
              });
            }
            onSetResults(results);
            onSetView(View.Quiz);
          } catch (error) {
            console.log(error);
          } finally {
            actions.setSubmitting(false);
            onSetShowLoader(false);
          }
        }}
      >
        <Form id = 'cat'>
        <Input id = "num"
            name="amount"
            label="Number of Questions"
            type="number"
            min={1}
            max={100}
            step={1}
          />
          <Select
            label="Category"
            name="category"
            options={[
              { value: "9", label: "General Knowledge" },
              { value: "21", label: "Sports" },
              { value: "22", label: "Geography" },
              { value: "27", label: "Animals" },
              { value: "28", label: "Vehicles" },
            ]}
          />
          
          
          <Select
            label="Difficulty"
            name="difficulty"
            options={[
              { value: "", label: "Any Difficulty" },
              { value: "easy", label: "Easy" },
              { value: "medium", label: "Medium" },
              { value: "hard", label: "Hard" },
            ]}
          />
          <Select
            label="Type"
            name="type"
            options={[
              { value: "", label: "Any Type" },
              { value: "multiple", label: "Multiple choice" },
              { value: "boolean", label: "True/False" },
            ]}
          />
          <button  id = "cr" type="submit" className="button is-primary mt-4">
            START
          </button>
        </Form>
      </Formik>
      {error && (
        <div className="message is-danger mt-4">
          <div className="message-body">{error}</div>
        </div>
      )}
    </>
  );
};
