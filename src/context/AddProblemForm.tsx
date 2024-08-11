"use client";
import { Difficulty, Language } from "@/config/constants";
import { ProblemInterface } from "@/models/problem.model";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";

export interface TestcaseInterface {
  id: string;
  input: string;
  output?: string | undefined;
  explanation?: string | undefined;
  visible: boolean;
}

interface AddProblemFormInterface {
  reasonForContribution: string;
  setReasonForContribtion: Dispatch<SetStateAction<string>>;
  companies: string;
  setCompanies: Dispatch<SetStateAction<string>>;
  topics: string;
  setTopics: Dispatch<SetStateAction<string>>;
  difficulty: Difficulty;
  setDifficulty: Dispatch<SetStateAction<Difficulty>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  lang: Language;
  setLang: Dispatch<SetStateAction<Language>>;
  inputFormat: string;
  setInputFormat: Dispatch<SetStateAction<string>>;
  outputFormat: string;
  setOutputFormat: Dispatch<SetStateAction<string>>;
  constraints: string;
  setConstraints: Dispatch<SetStateAction<string>>;
  testCases: TestcaseInterface[];
  setTestCases: Dispatch<SetStateAction<TestcaseInterface[]>>;
  hints: string;
  setHints: Dispatch<SetStateAction<string>>;
  followUp: string;
  setFollowUp: Dispatch<SetStateAction<string>>;
  addTestcase: () => void;
  updateTestcase: (testcase: TestcaseInterface) => void;
  deleteTestcase: (id: string) => void;
  submitForm: () => Promise<void>;
  progress: number;
}

const AddProblemFormContext = createContext<
  AddProblemFormInterface | undefined
>(undefined);

export const AddProblemFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [reasonForContribution, setReasonForContribtion] = useState<string>("");
  const [companies, setCompanies] = useState<string>("");
  const [topics, setTopics] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const [description, setDescription] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [lang, setLang] = useState<Language>(Language.Cpp);
  const [inputFormat, setInputFormat] = useState<string>("");
  const [outputFormat, setOutputFormat] = useState<string>("");
  const [constraints, setConstraints] = useState<string>("");
  const [testCases, setTestCases] = useState<TestcaseInterface[]>([
    { id: uuid(), input: "", visible: true },
    { id: uuid(), input: "", visible: false },
    { id: uuid(), input: "", visible: false },
  ]);
  const [hints, setHints] = useState<string>("");
  const [followUp, setFollowUp] = useState<string>("");
  const [progress, setProgress] = useState<number>(13);
  const pathname = usePathname();

  useEffect(() => {
    const newBasename = pathname.split("/").filter(Boolean).pop() || "";
    switch (newBasename.trim()) {
      case "background":
        setProgress(15);
        break;
      case "question":
        setProgress(40);
        break;
      case "solution":
        setProgress(60);
        break;
      case "testcases":
        setProgress(92);
        break;
      default:
        setProgress(0);
        break;
    }
  }, [pathname]);

  const addTestcase = () => {
    if (testCases.length == 15) {
      toast.error("Can't add more than 15 testcases");
      return;
    }
    setTestCases((prev) => [
      ...prev,
      {
        id: uuid(),
        input: "",
        output: undefined,
        explanation: undefined,
        visible: false,
      },
    ]);
  };

  const deleteTestcase = (id: string) => {
    if (testCases.length === 3) {
      toast.error("Test cases can't be smaller than 3");
      return;
    }
    setTestCases((prev) => prev.filter((testcase) => testcase.id != id));
  };

  const updateTestcase = (testcase: TestcaseInterface) => {
    setTestCases((prev) =>
      prev.map((prevTestcase) =>
        prevTestcase.id === testcase.id
          ? {
              ...prevTestcase,
              input: testcase.input,
              output: testcase.output,
              explanation: testcase.explanation,
              visible: testcase.visible,
            }
          : prevTestcase
      )
    );
  };

  const submitForm = async () => {
    let countVisible = 0;
    let checkFormat = true;
    let checkInput = true;
    const payload: Partial<ProblemInterface> = {
      title,
      description,
      difficulty,
      topics: topics.split(","),
      companies: companies.split(","),
      hints: hints
        .split("###")
        .map((curr) => {
          return curr.trim();
        })
        .filter((curr) => curr.length != 0),
      testCases: testCases.map((testCase) => {
        if (testCase.visible === true) countVisible++;
        if (testCase.visible === true && testCase.output?.trim().length === 0) {
          checkFormat = false;
        }
        if (testCase.input.trim().length === 0) {
          checkInput = false;
        }
        return {
          input: testCase.id,
          output: testCase.output,
          explanation: testCase.explanation,
          visible: testCase.visible,
        };
      }),
      inputFormat: inputFormat
        .split("###")
        .map((curr) => {
          return curr.trim();
        })
        .filter((curr) => curr.length != 0),
      outputFormat: outputFormat
        .split("###")
        .map((curr) => {
          return curr.trim();
        })
        .filter((curr) => curr.length != 0),
      constraints: constraints
        .split("###")
        .map((curr) => {
          return curr.trim();
        })
        .filter((curr) => curr.length != 0),
      followUp,
      reasonForContribution,
      solution: {
        language: lang,
        code,
      },
    };
    if (countVisible < 2) {
      toast.error("There must atleast 2 visible testcases");
      return;
    }

    if (!checkFormat) {
      toast.error("Visible testcase must have output");
      return;
    }

    if (!checkInput) {
      toast.error("Input is mandatory");
      return;
    }

    if (!title.trim()) {
      toast.error("Title is mandatory");
      router.push("/contribute/question/question");
      return;
    }

    if (!description.trim()) {
      toast.error("Description is mandatory");
      router.push("/contribute/question/question");
      return;
    }

    try {
      setProgress(95);
      await toast.promise(axios.post("/api/problem/createProblem", payload), {
        loading: "Submitting",
        success: "Submitted",
        error: "Failed!",
      });
      setProgress(100);
      router.push("/contribute");
    } catch (err: any) {
      toast.error("Something went wrong : ", err.message);
      setProgress(90);
    }
  };

  return (
    <AddProblemFormContext.Provider
      value={{
        reasonForContribution,
        setReasonForContribtion,
        title,
        setTitle,
        description,
        setDescription,
        companies,
        setCompanies,
        topics,
        setTopics,
        hints,
        setHints,
        testCases,
        setTestCases,
        lang,
        setLang,
        code,
        setCode,
        difficulty,
        setDifficulty,
        followUp,
        setFollowUp,
        inputFormat,
        setInputFormat,
        outputFormat,
        setOutputFormat,
        addTestcase,
        updateTestcase,
        deleteTestcase,
        submitForm,
        constraints,
        setConstraints,
        progress,
      }}
    >
      {children}
    </AddProblemFormContext.Provider>
  );
};

export const useAddProblemForm = () => {
  const context = useContext(AddProblemFormContext);
  if (!context) {
    throw new Error(
      "useAddProblemForm must be used within a AddProblemFormProvider"
    );
  }
  return context;
};
