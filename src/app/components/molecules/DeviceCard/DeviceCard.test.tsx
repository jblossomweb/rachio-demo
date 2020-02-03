import React from 'react';
import Window from 'window-or-global';
import { act } from 'react-dom/test-utils';
import forEach from 'lodash/forEach';
import { Switch } from '@material-ui/core';

import { getTestScenes, mountScenes } from 'core/test';
import RunButton from 'app/components/atoms/RunButton';
import RunDialog from 'app/components/molecules/RunDialog';
import { scenes } from './DeviceCard.stories';
import { defaultRunMinutes } from './DeviceCard.constants';
import * as Style from './DeviceCard.style';
import DeviceCard from './DeviceCard';

Window.console.log = () => {
  // silence storybook log of mock actions
  // TODO: mock the mock actions so I don't pollute Window scope
}

const getElements = (component: any) => ({
  styleWrapper: component.find(Style.Wrapper),
  runButton: component.find(RunButton),
  runDialog: component.find(RunDialog),
  switch: component.find(Switch),
});

const testScenes = getTestScenes(
  mountScenes(scenes),
  DeviceCard,
  getElements,
);

describe('components/molecules/DeviceCard', () => {
  it(`always mounts the DeviceCard component`, () => {
    forEach(testScenes, scene => {
      expect(scene.component.length).toBe(1);
    });
  });

  it(`always mounts the Style.Wrapper component`, () => {
    forEach(testScenes, scene => {
      const { styleWrapper } = scene.elements;
      expect(styleWrapper.length).toBe(1);
    });
  });

  it(`always mounts a RunButton component`, () => {
    forEach(testScenes, scene => {
      const { runButton } = scene.elements;
      expect(runButton.length).toBe(1);
    });
  });

  it(`always mounts a RunDialog component`, () => {
    forEach(testScenes, scene => {
      const { runDialog } = scene.elements;
      expect(runDialog.length).toBe(1);
    });
  });

  it(`always opens then RunDialog on RunButton click`, () => {
    forEach(testScenes, scene => {
      const { runButton, runDialog } = scene.elements;
      expect(runDialog.prop('open')).not.toBe(true);
      act(() => {
        runButton.props().onClick();
      });
      scene.wrapper.update();
      const updated = scene.wrapper.find(RunDialog);
      expect(updated.prop('open')).toBe(true);
    });
  });

  it(`always opens then RunDialog on RunButton click`, () => {
    forEach(testScenes, scene => {
      const { runButton, runDialog } = scene.elements;
      expect(runDialog.prop('open')).not.toBe(true);
      act(() => {
        runButton.props().onClick();
      });
      scene.wrapper.update();
      const updated = scene.wrapper.find(RunDialog);
      expect(updated.prop('open')).toBe(true);
    });
  });

  it(`always closes RunDialog on RunDialog close`, () => {
    forEach(testScenes, scene => {
      const { runButton, runDialog } = scene.elements;
      expect(runDialog.prop('open')).not.toBe(true);
      act(() => {
        runButton.props().onClick();
      });
      scene.wrapper.update();
      const opened = scene.wrapper.find(RunDialog);
      expect(opened.prop('open')).toBe(true);
      act(() => {
        runDialog.props().onClose();
      });
      scene.wrapper.update();
      const closed = scene.wrapper.find(RunDialog);
      expect(closed.prop('open')).not.toBe(true);
    });
  });

  it(`always updates RunDialog's minutes on RunDialog change`, () => {
    forEach(testScenes, scene => {
      const { runDialog } = scene.elements;
      expect(runDialog.prop('minutes')).toEqual(defaultRunMinutes);
      act(() => {
        runDialog.props().onChange({
          target: { value: String(defaultRunMinutes + 1) },
        });
      });
      scene.wrapper.update();
      const updated = scene.wrapper.find(RunDialog);
      expect(updated.prop('minutes')).toEqual(defaultRunMinutes + 1);
    });
  });

  it(`always resets RunDialog's minutes to default on RunButton click`, () => {
    forEach(testScenes, scene => {
      const { runButton, runDialog } = scene.elements;
      expect(runDialog.prop('minutes')).toEqual(defaultRunMinutes);
      act(() => {
        runDialog.props().onChange({
          target: { value: String(defaultRunMinutes + 1) },
        });
      });
      scene.wrapper.update();
      const updated = scene.wrapper.find(RunDialog);
      expect(updated.prop('minutes')).toEqual(defaultRunMinutes + 1);
      act(() => {
        runButton.props().onClick();
      });
      scene.wrapper.update();
      const reset = scene.wrapper.find(RunDialog);
      expect(reset.prop('minutes')).toEqual(defaultRunMinutes);
    });
  });

  it(`always closes RunDialog on RunDialog run`, () => {
    forEach(testScenes, scene => {
      const { runButton, runDialog } = scene.elements;
      expect(runDialog.prop('open')).not.toBe(true);
      act(() => {
        runButton.props().onClick();
      });
      scene.wrapper.update();
      const opened = scene.wrapper.find(RunDialog);
      expect(opened.prop('open')).toBe(true);
      act(() => {
        runDialog.props().onRun();
      });
      scene.wrapper.update();
      const closed = scene.wrapper.find(RunDialog);
      expect(closed.prop('open')).not.toBe(true);
    });
  });

  it(`always calls putZoneStartMultiple with expected args on RunDialog run`, () => {
    const testMinutes: number = 5;
    forEach(testScenes, ({ props }) => {
      const putZoneStartMultiple = jest.fn();
      const spyScene = () => (
        <DeviceCard
          {...props}
          putZoneStartMultiple={putZoneStartMultiple}
        />
      );
      const remounted = getTestScenes(
        mountScenes({ spyScene }),
        DeviceCard,
        getElements
      );
      const scene = remounted.spyScene;
      const { runDialog } = scene.elements;
      expect(putZoneStartMultiple).not.toHaveBeenCalled();
      act(() => {
        runDialog.props().onChange({
          target: { value: String(testMinutes) },
        });
      });
      scene.wrapper.update();
      const updated = scene.wrapper.find(RunDialog);
      expect(updated.prop('minutes')).toEqual(testMinutes);
      expect(putZoneStartMultiple).not.toHaveBeenCalled();
      act(() => {
        updated.prop('onRun')!();
      });
      scene.wrapper.update();
      expect(putZoneStartMultiple).toHaveBeenCalled();
      const expected = props.zoneIds.map((id: string, index: number) => ({
        id,
        duration: testMinutes * 60,
        sortOrder: index + 1,
      }));
      expect(putZoneStartMultiple).toHaveBeenCalledWith(expected);
    });
  });
});
