import cv2
import math
import cvzone
from ultralytics import YOLO

class GarbageDetector:
    def __init__(self, model_path):
        """
        Initialize the GarbageDetector with a YOLO model.

        Parameters:
        - model_path (str): Path to the YOLO model weights.
        """
        self.yolo_model = YOLO(model_path)
        self.class_labels = ['0', 'c', 'garbage', 'garbage_bag', 'sampah-detection', 'trash']

    def detect(self, image_path):
        """
        Detect waste in the input image.

        Parameters:
        - image_path (str): Path to the input image.

        Returns:
        - img (numpy.ndarray): The image with detections drawn on it.
        """
        # Load the image
        img = cv2.imread(image_path)

        # Perform object detection
        results = self.yolo_model(img)

        # Loop through the detections and draw bounding boxes
        for r in results:
            boxes = r.boxes
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

                w, h = x2 - x1, y2 - y1

                conf = math.ceil((box.conf[0] * 100)) / 100
                cls = int(box.cls[0])

                if conf > 0.3:
                    cvzone.cornerRect(img, (x1, y1, w, h), t=2)
                    cvzone.putTextRect(
                        img, f'{self.class_labels[cls]} {conf}', (x1, y1 - 10), scale=0.8, thickness=1, colorR=(255, 0, 0)
                    )

        return img

if __name__ == "__main__":
    model_path = input("Please enter the path to the model weights: ")
    image_path = input("Please enter the path to the image: ")

    try:
        detector = GarbageDetector(model_path)
        output_image = detector.detect(image_path)

        # Display the image with detections
        cv2.imshow("Waste Detection", output_image)

        # Close window when 'q' button is pressed
        while True:
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cv2.destroyAllWindows()
        cv2.waitKey(1)
    except Exception as e:
        print(f"An error occurred: {e}")
