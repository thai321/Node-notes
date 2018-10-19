### Networking traffic capturing
- Filter and write to pcap file: `tshark -r name-of-pcap-file.pcap -Y "bacnet" -w new_pcap_file.pcap -F pcap`
- merge all pcap files: `mergecap -w capture_name.pcap *other_name*`
- Capturing traffic on an interface: 
  - `tcpdump -i eth0 -s 1500 -w /var/log/name.pcap &`
  - `dumpcap -i eth0 -f "host 192.168.1.15" -w name.pcap`

- Capturing traffic base on an OUI:
  - Ex: Mac Address = `02:34:56:ab:cd:ef`
  - `/usr/sbin/tcpdump -i eth0 "ether[6:2]==0x0234" and "ether[8:1]==0x56" -s 1500 -w name.pcap &`

- Capturing traffic base on a Mac:
  - Ex: Mac Address = `02:34:56:ab:cd:ef`
  - `/usr/sbin/tcpdump -i eth0 ether host 02:34:56:ab:cd:ef -s 1500 -w name.pcap &`

- Capturing traffic base on the ports:
  -  `#/usr/sbin/tcpdump -i eth0 port 67 or port 547 -s 1500 -w name.pcap &`
