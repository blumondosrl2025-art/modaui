export interface EmotionalStoryTemplate {
  storyId: string;
  themeNode: string;
  heroHeadline: string;
  lookbookQuote: string;
  subtextDetails: string;
  sensoryTrigger: string; // e.g. "Smell of volcanic stone & fresh rainfall"
  artisticActionLabel: string;
}

export const ATELIER_EMOTIONAL_STORIES: Record<string, EmotionalStoryTemplate> = {
  jacquemus_summer: {
    storyId: "jacquemus_summer",
    themeNode: "Provence Clay & Salt Air",
    heroHeadline: "Le Splash Solaire",
    lookbookQuote: "“A single oversized linen jacket draped on plaster stones, reflecting the lazy noon sun of Marseille.”",
    subtextDetails: "Our raw sun-baked knits are woven on vintage 1940 looms in southern France. Each grain pattern retains memory of the artisan's manual tension.",
    sensoryTrigger: "Warm limestone clay, sun-bleached rope, lavender grass stems.",
    artisticActionLabel: "COMMISSION PIECES"
  },
  leica_optics: {
    storyId: "leica_optics",
    themeNode: "Fuji Chrome & Silver Halide Black",
    heroHeadline: "The Sacred Decisive Moment",
    lookbookQuote: "“Not a capture of megapixels, but the physical light of an instant focused through hand-polished fluorite elements.”",
    subtextDetails: "Assembled in Wetzlar. The silent mechanical leaf shutter fires with a reassuring internal pneumatic click, isolated from digital radio frequencies.",
    sensoryTrigger: "Milled aerospace titanium housing, vulcanite leather cladding, micro-lubricants.",
    artisticActionLabel: "ACQUIRE INSTRUMENT"
  },
  fear_of_god_seventh: {
    storyId: "fear_of_god_seventh",
    themeNode: "Bone Plaster & Heavy Wool Melange",
    heroHeadline: "The Monastic Sculptural Silhouette",
    lookbookQuote: "“Incurring divine respect through the heavy physical weight of structured double-breasted cashmere.”",
    subtextDetails: "Tailored by hand in Italy. Features soft dropped shoulders, elevated armholes for sculptural drape, and natural buffalo horn buttons.",
    sensoryTrigger: "Felt wool melange density, organic milk-silk linings, cold morning plaster.",
    artisticActionLabel: "ENTER COLLECTION ARCHIVE"
  }
};

export class EmotionalCommerceEngine {
  /**
   * Retrieves an atmospheric storytelling module structure.
   */
  static getEmotionalStory(storyKey: string): EmotionalStoryTemplate {
    return ATELIER_EMOTIONAL_STORIES[storyKey] || ATELIER_EMOTIONAL_STORIES.jacquemus_summer;
  }
}
