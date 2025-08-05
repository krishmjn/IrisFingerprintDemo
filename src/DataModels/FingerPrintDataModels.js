export class FingerPrint {
  constructor(data) {
    // Extract common fields from the first fingerprint object
    const firstFp = data.fingerprints[0];
    this.id = data.id || firstFp.template_id || firstFp.case_id;
    this.name = firstFp.name || "-";
    this.enrollType =
      firstFp.enroll_type === "chance print"
        ? "Chance Print"
        : firstFp.enroll_type === "Live enroll"
        ? "Live Enroll"
        : "-";
    this.gender =
      firstFp.gender === 1 ? "Male" : firstFp.gender === 2 ? "Female" : "-";
    this.dob = firstFp.dob || "-";

    // Store all fingerprint details in an array
    this.fingerPrintDetails = data.fingerprints.map((fp) => ({
      fingerName: fp.finger_name || "-",
      fingerprintTerminations: fp.fingerprint_terminations || "-",
      totalMinutiaePoints: fp.total_minutiae_points || "-",
      fingerprintType: fp.fingerprint_type || "-",
      bifurcations_count: fp.bifurcations_count || "-",
      caseDescription: fp.case_description || "-",
      enhancedImage: fp.enhanced_image || null,
      minutiaeImage: fp.minutiae_plotted_image || null,
      originalImage: fp.original_image || null,
    }));
  }

  static mapData(jsonData) {
    // Convert the object into an array of FingerPrint instances, one per unique id
    return Object.entries(jsonData).map(([id, fingerprints]) => {
      return new FingerPrint({ id, fingerprints });
    });
  }
}
