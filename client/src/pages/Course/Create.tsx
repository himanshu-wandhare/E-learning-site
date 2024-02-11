import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import Step1 from "./Step1";
import Step2 from "./Step2";

// type FormHandler = React.FormEventHandler<HTMLFormElement>;
// type InputHandler = React.ChangeEventHandler<HTMLInputElement>;

export default function Create() {
  const handleComplete = () => {
    console.log("Form completed!");
  };
  const tabChanged = ({
    prevIndex,
    nextIndex,
  }: {
    prevIndex: number;
    nextIndex: number;
  }) => {
    console.log("prevIndex", prevIndex);
    console.log("nextIndex", nextIndex);
  };

  return (
    <div style={{ height: "100vh" }}>
      <FormWizard
        shape="circle"
        color="black"
        stepSize="sm"
        onComplete={handleComplete}
        onTabChange={tabChanged}
      >
        <FormWizard.TabContent title="Create Course" icon="ti-user">
          <Step1 />
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Add Lectures" icon="ti-settings">
          <Step2 />
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Last step" icon="ti-check">
          <h1>Last Tab</h1>
          <p>Some content for the last tab</p>
        </FormWizard.TabContent>
      </FormWizard>
      {/* add style */}
      <style>{`
        @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
      `}</style>
    </div>
  );
}
