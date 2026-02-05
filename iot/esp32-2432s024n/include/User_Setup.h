#pragma once
#include "config.h"

#define SPI_FREQUENCY  40000000
#define SPI_READ_FREQUENCY  16000000
#define SPI_TOUCH_FREQUENCY  2500000

#if WHM_TFT_DRIVER_ILI9341
  #define ILI9341_DRIVER
  #define TFT_WIDTH  240
  #define TFT_HEIGHT 320
#elif WHM_TFT_DRIVER_ST7789
  #define ST7789_DRIVER
  #define TFT_WIDTH  240
  #define TFT_HEIGHT 240
#endif

#define TFT_MOSI WHM_TFT_MOSI
#define TFT_MISO WHM_TFT_MISO
#define TFT_SCLK WHM_TFT_SCLK
#define TFT_CS   WHM_TFT_CS
#define TFT_DC   WHM_TFT_DC
#define TFT_RST  WHM_TFT_RST

#define LOAD_GLCD
#define LOAD_FONT2
#define LOAD_FONT4
#define LOAD_FONT6
#define LOAD_FONT7
#define LOAD_FONT8
#define LOAD_GFXFF
#define SMOOTH_FONT
