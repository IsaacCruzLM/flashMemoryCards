export interface CategoryListCardProps {
  title: string;
  creationDate: string;
  numberOfNotes: number;
  icon: string;
  iconColor: string;
  numberNotesToReview?: number;
  onPress: () => void;
  containerStyle?: object;
}
