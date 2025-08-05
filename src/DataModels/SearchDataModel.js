export class SearchDataModel {
  constructor(data) {
    this.enhancedImage = data?.enhanced_image;
    this.minutiae_plotted_image = data?.minutiae_plotted_image;
    this.original_image = data?.original_image;
    this.fingerprint_metadata = data?.fingerprint_metadata;
    this.matches = data?.matches;
  }

  static mapData(data) {
    if (!data || typeof data !== "object") return [];

    // return Object.entries(data).map(([key, value]) => {
    return new SearchDataModel(data);
    // });
  }
}
