# EdgeToApp
This repository contains source code from the EdgeToApp elective at Kristiania University ([PGR212](https://www.kristiania.no/en/syllabus/school-of-economics-innovation-and-technology/first-cycle-degree/pgr212/from-edge-to-app/)). The topic teaches Full Stack development based on the MERN stack with data collected from an Edge Device. Unless noted otherwise, all examples are complete PlatformIO projects for the [LectureFeather](https://github.com/jenschr/LectureFeather) board.

The [LectureFeather](https://github.com/jenschr/LectureFeather) board is made especially for the topic and it's based on a ESP32-S3 with 8Mb Flash and no PSRAM. It has builtin sensors for ambient air (temperature & humidity), Light (visible + IR), Acceleration and magnetism.

## Troubleshooting
The hardware was not pain free as the chip was quite new when the topic started. Support for the chip get's better by the month, but I wrote up a [long article on how to solve the most common issues with the ESP32-S3](https://flashgamer.com/blog/comments/solving-platformio-issues-with-the-adafruit-feather-s3).

## Example files
The example files are organized according to the planned structure of the topic. In reality, we spent more time than anticipated on the first lectures for the first year on the topic (2023) but adjustments will be made to the material for future semesters.

## Note to self when adding files
The React and React Native project generators will add GIT files. These don't like to be inside another project, so I must delete all .git and .gitignore files when I add them to this repo. That's not enough however. Submodules are also added by default and these are cached. After removing the git files from each project, we must then remove any cached files using:

`git rm --cached Foldername`
