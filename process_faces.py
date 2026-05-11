import cv2
import os
import glob
import numpy as np

def draw_smiley(img, x, y, w, h):
    center = (x + w//2, y + h//2)
    # make the radius slightly larger than face
    radius = int(max(w, h) / 2 * 1.2)
    
    # Draw yellow circle
    cv2.circle(img, center, radius, (0, 220, 255), -1) # BGR
    # Draw dark outline
    cv2.circle(img, center, radius, (0, 100, 150), max(1, int(radius * 0.05)))
    
    # Eyes
    eye_offset_x = int(radius * 0.35)
    eye_offset_y = int(radius * 0.25)
    eye_radius = max(2, int(radius * 0.12))
    cv2.circle(img, (center[0] - eye_offset_x, center[1] - eye_offset_y), eye_radius, (20, 20, 20), -1)
    cv2.circle(img, (center[0] + eye_offset_x, center[1] - eye_offset_y), eye_radius, (20, 20, 20), -1)
    
    # Smile (ellipse arc)
    axes = (int(radius * 0.5), int(radius * 0.4))
    cv2.ellipse(img, center, axes, 0, 10, 170, (20, 20, 20), max(2, int(radius * 0.08)))

def main():
    input_dir = 'children'
    output_dir = 'photos/children_processed'
    os.makedirs(output_dir, exist_ok=True)
    
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    profile_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_profileface.xml')
    
    image_paths = glob.glob(os.path.join(input_dir, '*.[jJ][pP][gG]')) + \
                  glob.glob(os.path.join(input_dir, '*.[pP][nN][gG]')) + \
                  glob.glob(os.path.join(input_dir, '*.[jJ][pP][eE][gG]'))
                  
    for img_path in image_paths:
        img = cv2.imread(img_path)
        if img is None:
            continue
            
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Detect frontal faces
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=4, minSize=(30, 30))
        # Detect profile faces
        profiles = profile_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=4, minSize=(30, 30))
        
        # Combine faces and profiles
        all_faces = list(faces) + list(profiles)
        
        for (x, y, w, h) in all_faces:
            draw_smiley(img, x, y, w, h)
            
        # Also detect faces using lower minNeighbors if none found, to be safe
        if len(all_faces) == 0:
            faces2 = face_cascade.detectMultiScale(gray, scaleFactor=1.05, minNeighbors=2, minSize=(20, 20))
            for (x, y, w, h) in faces2:
                draw_smiley(img, x, y, w, h)
                
        out_path = os.path.join(output_dir, os.path.basename(img_path))
        cv2.imwrite(out_path, img)
        print(f"Processed: {out_path}")

if __name__ == '__main__':
    main()
