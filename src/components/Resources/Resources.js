import "./index.css";
import React from "react";
import useToggle from "../../hooks/useToggle";

const ResourcesComponent = ({ testId, resources }) => {
    const [show, setShow] = useToggle(false);

    const resourcesMap = resources
        ? resources.split(" ").map((resource, index) => {
              if (index === 0) return null;
              return (
                  <div
                      key={testId + index}
                      data-testid="resource"
                      className="resource"
                  >
                      &#8594;{" "}
                      <a
                          href={resource}
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                          {resource}
                      </a>
                  </div>
              );
          })
        : null;

    const isActive = show ? " active" : "";

    return (
        <div data-testid="resource-box" className={"resource-box" + isActive}>
            <div
                data-testid="resource-header"
                className={"resource-header"}
                onClick={setShow}
            >
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
