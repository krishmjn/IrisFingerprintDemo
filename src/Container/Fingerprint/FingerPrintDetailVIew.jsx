import { Tabs } from "antd";
import React from "react";
import { DataLabel, Value } from "./style";
import { fingerNameConverter } from "./helper";

const FingerPrintDetailVIew = ({ data }) => {
  const { fingerPrintDetails, id, name, enrollType, gender, dob } = data || {};
  console.log(fingerPrintDetails, 999);

  const items = [];

  fingerPrintDetails?.forEach((fp) => {
    const imageTabs = [];
    if (fp.originalImage) {
      imageTabs.push({
        label: "Original Image",
        key: "original",
        children: (
          <div style={{ width: "200px", height: "200px", margin: "5px auto" }}>
            <img
              src={fp.originalImage}
              alt="Original"
              height={"200px"}
              width={"200px"}
            />
          </div>
        ),
      });
    }

    if (fp.enhancedImage) {
      imageTabs.push({
        label: "Enhanced Image",
        key: "enhanced",
        children: (
          <div style={{ width: "200px", height: "200px", margin: "5px auto" }}>
            <img
              src={fp.enhancedImage}
              alt="Enhanced"
              height={"200px"}
              width={"200px"}
            />
          </div>
        ),
      });
    }

    if (fp.minutiaeImage) {
      imageTabs.push({
        label: "Minutiae Image",
        key: "minutiae",
        children: (
          <div style={{ width: "200px", height: "200px", margin: "5px auto" }}>
            <img
              src={fp.minutiaeImage}
              alt="Minutiae"
              height={"200px"}
              width={"200px"}
            />
          </div>
        ),
      });
    }

    items.push({
      label: fingerNameConverter(fp.fingerName),
      key: fp.fingerName,
      children: (
        <div>
          {/* Nested tabs for images */}
          <Tabs items={imageTabs} />

          {/* Fingerprint metadata */}
          <div style={{ marginTop: "20px" }}>
            <DataLabel>
              Fingerprint Type:<Value> {fp.fingerprintType}</Value>
            </DataLabel>
            <DataLabel>
              Finger Name: <Value>{fingerNameConverter(fp.fingerName)}</Value>
            </DataLabel>
            <DataLabel>
              Fingerprint Terminations Count:{" "}
              <Value>{fp.fingerprintTerminations}</Value>
            </DataLabel>
            <DataLabel>
              Fingerprint Bifurcations Count:{" "}
              <div
                style={{
                  backgroundColor: "#009600",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></div>
              <Value> {fp.bifurcations_count}</Value>
            </DataLabel>
            <DataLabel>
              {" "}
              Total Minutiae Points:{" "}
              <div
                style={{
                  backgroundColor: "#000096",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></div>
              <Value> {fp.totalMinutiaePoints}</Value>
            </DataLabel>
            <DataLabel>
              Case Description:<Value> {fp.caseDescription}</Value>
            </DataLabel>
          </div>
        </div>
      ),
    });
  });

  return (
    <div>
      <Tabs items={items} />
    </div>
  );
};

export default FingerPrintDetailVIew;
