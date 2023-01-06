import "./index.css";
import React from "react";
import useToggle from "../../hooks/useToggle";

const ResourcesComponent = ({ testId, resources }) => {
    const [show, setShow] = useToggle(false);

    const resourcesMap = resources
        ? resources.split(" ").map((resource, index) => {
              if (index === 0) return;
              return (
                  <div key={testId + index} className="resource">
                      &#8594;{" "}
                      <a href={resource} target="_blank">
                          {resource}
                      </a>
                  </div>
              );
          })
        : null;

    const isActive = show ? " active" : "";

    return (
        <div className={"resource-box" + isActive}>
            <div className={"resource-header"} onClick={setShow}>
                <span className={isActive}>&#8681;</span>
            </div>
            <div className="resource-wrapper">
                <h2>List of sites that you could find useful:</h2>
                <div className="resources">
                    {resourcesMap ? resourcesMap : <div>Empty</div>}
                </div>
            </div>
        </div>
    );
};

export default ResourcesComponent;
