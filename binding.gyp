{
  "targets": [
    {
      "target_name": "car",
      "sources": [
        "car.cc"
      ],
      "libraries": [
        "/usr/lib/libwiringPi.so"
      ],
      "include_dirs": ["<!(node -e \"require('nan')\")"]
    }
  ]
}
