export interface CategoryListCardProps {
  title: string;
  creationDate: string;
  numberOfNotes: number;
  icon: string;
  numberNotesToReview?: number;
  onPress: () => void;
  containerStyle?: object;
}
