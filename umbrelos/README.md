# UmbrelOS VM Status

Last updated: 2026-02-27

## Current status

- VM: `umbrelos` is running
- Persistent: yes
- Autostart: enabled
- Disk capacity: `1288490188800` bytes (`~1.17 TiB` virtual, thin-provisioned)
- Launcher added: `open-umbrel-vm` (`/home/fletchervaughn/bin/open-umbrel-vm`)

## How to access it now

1. Run `open-umbrel-vm`
2. Or run `virt-viewer --connect qemu:///system umbrelos`
3. Or open `virt-manager` and double-click `umbrelos`

## After Umbrel install finishes in the VM

1. Reboot VM.
2. On host browser, try `http://umbrel.local`
3. If that does not resolve, get VM IP with:
   - `sudo virsh domifaddr umbrelos --source lease`
   - Then open `http://<that-ip>`

## Storage heads-up

- The VM disk is thin-provisioned and will grow as data is written.
- Host free space is currently limited (about 22 GB at setup time).
- For full Bitcoin sync, use storage with **real** free space of at least 1 TB.

## Hive USB guidance

Current state on this machine:

- `/mnt/extbuild` (Hive ext4 partition on `sda4`) is full (`100%`).
- `HIVE` NTFS partition (`sda1`) is not suitable for Umbrel data storage.

Recommendation:

- Best: add a dedicated SSD/HDD (1 TB+ free), then move Umbrel VM disk there.
- Temporary only: use Hive disk **after** freeing substantial space and validating stable mount/performance.

## Useful commands

```bash
# VM state
sudo virsh dominfo umbrelos

# Start/stop VM
sudo virsh start umbrelos
sudo virsh shutdown umbrelos

# Force stop if needed
sudo virsh destroy umbrelos

# Open VM console
open-umbrel-vm

# Check VM disk capacity/allocation
sudo virsh domblkinfo umbrelos vda
```
