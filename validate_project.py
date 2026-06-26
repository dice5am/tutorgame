import os
import sys

def main():
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        pass

    workspace_dir = r"c:\Users\cavin\Desktop\Antigravity test\Test_1"
    images_dir = os.path.join(workspace_dir, "assets", "images")
    
    print("==================================================")
    print("   Alphabet Pop & Learn! Project Validator        ")
    print("==================================================")
    print(f"Checking assets in: {images_dir}\n")
    
    if not os.path.exists(images_dir):
        print(f"ERROR: Images directory '{images_dir}' does not exist!")
        sys.exit(1)
        
    # Maps letters to their expected PNG and SVG words
    alphabet = [
        ("A", "apple", "apple"), 
        ("B", "bear", "ball"), 
        ("C", "cat", "cat"), 
        ("D", "dog", "dog"), 
        ("E", "elephant", "elephant"), 
        ("F", "frog", "fish"), 
        ("G", "giraffe", "grapes"), 
        ("H", "hippo", "house"), 
        ("I", "iguana", "ice_cream"), 
        ("J", "jellyfish", "jellyfish"), 
        ("K", "koala", "kite"), 
        ("L", "lion", "lion"), 
        ("M", "monkey", "monkey"), 
        ("N", "nest", "nest"), 
        ("O", "owl", "owl"), 
        ("P", "penguin", "penguin"), 
        ("Q", "queen", "queen"), 
        ("R", "robot", "robot"), 
        ("S", "sun", "sun"), 
        ("T", "tree", "tree"), 
        ("U", "umbrella", "umbrella"), 
        ("V", "violin", "violin"), 
        ("W", "watermelon", "watermelon"), 
        ("X", "xylophone", "xylophone"), 
        ("Y", "yacht", "yacht"), 
        ("Z", "zebra", "zebra")
    ]
    
    svg_missing = []
    png_missing = []
    svg_found = 0
    png_found = 0
    
    print(f"{'Letter':<8} | {'PNG Word':<12} | {'SVG Word':<12} | {'SVG Status':<12} | {'PNG Status':<12}")
    print("-" * 67)
    
    for letter, png_word, svg_word in alphabet:
        svg_name = f"{letter.lower()}_{svg_word}.svg"
        png_name = f"{letter.lower()}_{png_word}.png"
        
        svg_path = os.path.join(images_dir, svg_name)
        png_path = os.path.join(images_dir, png_name)
        
        svg_exists = os.path.exists(svg_path)
        png_exists = os.path.exists(png_path)
        
        if svg_exists:
            svg_status = "FOUND"
            svg_found += 1
        else:
            svg_status = "MISSING"
            svg_missing.append(svg_name)
            
        if png_exists:
            png_status = "FOUND"
            png_found += 1
        else:
            png_status = "MISSING"
            png_missing.append(png_name)
            
        print(f"{letter:<8} | {png_word:<12} | {svg_word:<12} | {svg_status:<12} | {png_status:<12}")
        
    print("\n==================================================")
    print("                Progress Summary                  ")
    print("==================================================")
    print(f"SVG Files: {svg_found}/26 ({(svg_found/26)*100:.1f}%)")
    print(f"PNG Files: {png_found}/26 ({(png_found/26)*100:.1f}%)")
    
    if svg_missing:
        print("\nMissing SVG Files:")
        for name in svg_missing:
            print(f" - {name}")
            
    if png_missing:
        print("\nMissing PNG Files (being generated in background):")
        for name in png_missing:
            print(f" - {name}")
            
    if svg_found == 26 and png_found == 26:
        print("\nALL ASSETS VALIDATED! Project is fully complete!")
    else:
        print("\nNote: Some PNG assets are still being generated in the background.")
    print("==================================================")

if __name__ == "__main__":
    main()
