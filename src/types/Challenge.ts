export interface Challenge {
  id: string;
  title: string;
  category: string;
  description: string;
  position: [number, number, number]; // Using proper tuple type
  // Add other required properties based on your implementation
}